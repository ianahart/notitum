package com.hart.notitum.member;

import com.hart.notitum.member.request.CreateMemberRequest;
import com.hart.notitum.member.request.SearchMembersRequest;
import com.hart.notitum.member.response.CreateMemberResponse;
import com.hart.notitum.member.response.GetMemberWorkspaceResponse;
import com.hart.notitum.member.response.GetMembersResponse;
import com.hart.notitum.member.response.SearchMembersResponse;

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
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<CreateMemberResponse> createMember(@RequestBody CreateMemberRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateMemberResponse("success",
                this.memberService.createMember(request.getEmail(), request.getWorkspaceId())));
    }

    @PostMapping("/search")
    public ResponseEntity<SearchMembersResponse> searchMembers(@RequestBody SearchMembersRequest request) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new SearchMembersResponse("success",
                        this.memberService.searchMembers(request.getQuery(), request.getWorkspaceId())));
    }

    @GetMapping
    public ResponseEntity<GetMembersResponse> getMembers(
            @RequestParam("workspaceId") Long workspaceId,
            @RequestParam("page") int page,
            @RequestParam("direction") String direction,
            @RequestParam("pageSize") int pageSize

    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetMembersResponse("success",
                        this.memberService.getMembers(workspaceId, page, direction, pageSize)));
    }

    @GetMapping("/workspaces")
    public ResponseEntity<GetMemberWorkspaceResponse> getMemberWorkspaces(@RequestParam("userId") Long userId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetMemberWorkspaceResponse("success", this.memberService.getMemberWorkspaces(userId)));
    }
}
