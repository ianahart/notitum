package com.hart.notitum.member;

import java.util.List;

import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.workspace.WorkspaceRepository;
import com.hart.notitum.workspace.dto.WorkspaceDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final WorkspaceRepository workspaceRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository,
            WorkspaceRepository workspaceRepository) {
        this.memberRepository = memberRepository;
        this.workspaceRepository = workspaceRepository;
    }

    public List<WorkspaceDto> getMemberWorkspaces(Long userId) {
        if (userId == null) {
            throw new BadRequestException("userId was not found getting member workspaces");
        }
        List<Long> ids = this.memberRepository.getMemberWorkspaces(userId)
                .stream()
                .map(v -> v.getWorkspace().getId())
                .toList();

        return this.workspaceRepository.getWorkspacesByIds(ids);
    }

    public boolean checkIfMemberExists(Long workspaceId, Long userId) {
        Long memberId = this.memberRepository.checkIfMemberExists(userId, workspaceId);
        if (memberId != null) {
            return true;
        }
        return false;
    }
}
