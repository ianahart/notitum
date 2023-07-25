package com.hart.notitum.member;

import java.util.List;
import java.util.ArrayList;

import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.member.dto.MemberDto;
import com.hart.notitum.member.dto.MemberPaginationDto;
import com.hart.notitum.util.MyUtils;
import com.hart.notitum.workspace.WorkspaceRepository;
import com.hart.notitum.workspace.dto.WorkspaceDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public MemberPaginationDto getMembers(Long workspaceId, int page, String direction, int pageSize) {
        if (workspaceId == null) {
            throw new BadRequestException("Workspace id missing from request");
        }
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<MemberDto> result = this.memberRepository.getMembers(workspaceId, paging);

        return new MemberPaginationDto(result.getContent(), currentPage, direction, pageSize, result.getTotalPages());
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

    public List<MemberDto> searchMembers(String query, Long workspaceId) {
        if (workspaceId == null) {
            throw new BadRequestException("Workspace id is missing from the request");
        }
        if (query.strip().length() != 0) {
            return this.memberRepository.searchMembers(query.toLowerCase(), workspaceId);
        }

        List<MemberDto> noResults = new ArrayList<>();
        return noResults;
    }
}
