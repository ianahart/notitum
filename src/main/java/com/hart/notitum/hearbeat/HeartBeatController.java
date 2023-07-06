package com.hart.notitum.hearbeat;

import com.hart.notitum.hearbeat.response.HeartBeatResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/heartbeat")
public class HeartBeatController {

    @GetMapping
    public ResponseEntity<HeartBeatResponse> getHeartBeat() {
        return ResponseEntity.status(200).body(new HeartBeatResponse("secured endpoint."));
    }
}
