package com.hart.notitum.card;

import com.hart.notitum.card.request.CreateCardRequest;
import com.hart.notitum.card.request.ReorderCardsRequest;
import com.hart.notitum.card.request.UpdateCardCoverPhotoRequest;
import com.hart.notitum.card.request.UpdateCardDatesRequest;
import com.hart.notitum.card.request.UpdateCardRequest;
import com.hart.notitum.card.response.CreateCardResponse;
import com.hart.notitum.card.response.DeleteCardResponse;
import com.hart.notitum.card.response.FilterCardsResponse;
import com.hart.notitum.card.response.ReorderCardsResponse;
import com.hart.notitum.card.response.UpdateCardCoverPhotoResponse;
import com.hart.notitum.card.response.UpdateCardDatesResponse;
import com.hart.notitum.card.response.UpdateCardResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/cards")

public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping
    public ResponseEntity<FilterCardsResponse> filterCards(
            @RequestParam("userId") Long userId,
            @RequestParam("sort") String sort,
            @RequestParam("filterWorkspaces") String filterWorkspaces,
            @RequestParam("filterDates") String filterDates,
            @RequestParam("activeWorkspaceId") Long activeWorkspaceId) {
        return ResponseEntity.status(HttpStatus.OK).body(new FilterCardsResponse("success",
                this.cardService.filterCards(userId, sort, filterWorkspaces, filterDates, activeWorkspaceId)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteCardResponse> deleteCard(@PathVariable("id") Long id,
            @RequestParam("workspaceUserId") Long workspaceUserId) {
        this.cardService.deleteCard(id, workspaceUserId);
        return ResponseEntity.status(HttpStatus.OK).body(new DeleteCardResponse("success"));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UpdateCardResponse> updateCards(@PathVariable("id") Long id,
            @RequestBody UpdateCardRequest request) {

        this.cardService.updateCard(request.getCard(), request.getWorkspaceListId(), request.getUserId());
        return ResponseEntity
                .status((HttpStatus.OK))
                .body(new UpdateCardResponse("success"));
    }

    @PostMapping("/reorder")
    public ResponseEntity<ReorderCardsResponse> reorderCards(@RequestBody ReorderCardsRequest request) {
        this.cardService.reorderCards(request.getData(), request.getWorkspaceUserId());
        return ResponseEntity.status(HttpStatus.OK).body(new ReorderCardsResponse("success"));
    }

    @PostMapping
    public ResponseEntity<CreateCardResponse> createCard(@RequestBody CreateCardRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateCardResponse("success",
                        this.cardService.createCard(request.getTitle(), request.getUserId(),
                                request.getWorkspaceListId(), request.getIndex())));
    }

    @PatchMapping("/{id}/dates")
    public ResponseEntity<UpdateCardDatesResponse> updateCardDates(@PathVariable("id") Long id,
            @RequestBody UpdateCardDatesRequest request) {

        this.cardService.updateCardDates(id, request.getAction(), request.getValues(), request.getWorkspaceUserId());
        return ResponseEntity.status(HttpStatus.OK).body(new UpdateCardDatesResponse("success"));
    }

    @PatchMapping("{id}/cover-photo")
    public ResponseEntity<UpdateCardCoverPhotoResponse> updateCardCoverPhoto(@PathVariable("id") Long id,
            @RequestBody UpdateCardCoverPhotoRequest request) {
        this.cardService.updateCardCoverPhoto(id, request.getCoverPhoto(), request.getWorkspaceUserId());
        return ResponseEntity.status(HttpStatus.OK).body(new UpdateCardCoverPhotoResponse("success"));
    }
}
