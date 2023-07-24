package com.hart.notitum.member;

import com.hart.notitum.member.response.GetMemberWorkspaceResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/workspaces")
    public ResponseEntity<GetMemberWorkspaceResponse> getMemberWorkspaces(@RequestParam("userId") Long userId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetMemberWorkspaceResponse("success", this.memberService.getMemberWorkspaces(userId)));
    }
}
