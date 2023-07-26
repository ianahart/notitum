package com.hart.notitum.activelabel;

import com.hart.notitum.activelabel.request.CreateActiveLabelRequest;
import com.hart.notitum.activelabel.response.CreateActiveLabelResponse;
import com.hart.notitum.activelabel.response.DeleteActiveLabelResponse;
import com.hart.notitum.activelabel.response.GetActiveLabelsResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/active-labels")
public class ActiveLabelController {
    private final ActiveLabelService activeLabelService;

    @Autowired
    public ActiveLabelController(ActiveLabelService activeLabelService) {
        this.activeLabelService = activeLabelService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteActiveLabelResponse> deleteActiveLabel(@PathVariable("id") Long id,
            @RequestParam("cardId") Long cardId) {
        this.activeLabelService.deleteActiveLabel(id, cardId);
        return ResponseEntity.status(HttpStatus.OK).body(new DeleteActiveLabelResponse("success"));
    }

    @GetMapping
    public ResponseEntity<GetActiveLabelsResponse> getActiveLabels(@RequestParam("cardId") Long cardId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetActiveLabelsResponse("success", this.activeLabelService.getActiveLabels(cardId)));
    }

    @PostMapping
    public ResponseEntity<CreateActiveLabelResponse> createActiveLabel(@RequestBody CreateActiveLabelRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateActiveLabelResponse("success",
                this.activeLabelService.createActiveLabel(request.getLabelId(), request.getChecked(),
                        request.getCardId())));
    }
}
