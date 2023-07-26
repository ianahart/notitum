package com.hart.notitum.label;

import com.hart.notitum.label.request.CreateLabelRequest;
import com.hart.notitum.label.response.CreateLabelResponse;
import com.hart.notitum.label.response.GetLabelsResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/labels")
public class LabelController {

    private final LabelService labelService;

    @Autowired
    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    @GetMapping
    public ResponseEntity<GetLabelsResponse> getLabels(@RequestParam("workspaceId") Long workspaceId,
            @RequestParam("cardId") Long cardId) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetLabelsResponse("success", this.labelService.getLabels(workspaceId)));
    }

    @PostMapping
    public ResponseEntity<CreateLabelResponse> createLabel(@RequestBody CreateLabelRequest request) {
        this.labelService.createLabel(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateLabelResponse("success"));
    }
}
