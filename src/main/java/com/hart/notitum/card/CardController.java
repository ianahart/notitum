package com.hart.notitum.card;

import com.hart.notitum.card.request.CreateCardRequest;
import com.hart.notitum.card.request.ReorderCardsRequest;
import com.hart.notitum.card.request.UpdateCardRequest;
import com.hart.notitum.card.response.CreateCardResponse;
import com.hart.notitum.card.response.ReorderCardsResponse;
import com.hart.notitum.card.response.UpdateCardResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/cards")

public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
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
        this.cardService.reorderCards(request.getData());
        return ResponseEntity.status(HttpStatus.OK).body(new ReorderCardsResponse("success"));
    }

    @PostMapping
    public ResponseEntity<CreateCardResponse> createCard(@RequestBody CreateCardRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateCardResponse("success",
                        this.cardService.createCard(request.getTitle(), request.getUserId(),
                                request.getWorkspaceListId(), request.getIndex())));
    }
}
