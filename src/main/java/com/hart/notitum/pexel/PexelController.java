package com.hart.notitum.pexel;

import com.hart.notitum.pexel.response.PexelResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/pexels")
public class PexelController {

    private final PexelService pexelService;

    @Autowired
    public PexelController(PexelService pexelService) {
        this.pexelService = pexelService;
    }

    @GetMapping
    public ResponseEntity<PexelResponse> getPexelBackgrounds(@RequestParam("page") int page,
            @RequestParam("perPage") int perPage, @RequestParam("query") String query) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new PexelResponse("success", this.pexelService.getPexelBackgrounds(page, perPage, query)));
    }
}
