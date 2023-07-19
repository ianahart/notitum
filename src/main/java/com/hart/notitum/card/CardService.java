package com.hart.notitum.card;

import com.hart.notitum.list.WorkspaceList;
import com.hart.notitum.list.WorkspaceListRepository;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserRepository;
import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final WorkspaceListRepository workspaceListRepository;

    @Autowired
    public CardService(CardRepository cardRepository,
            UserRepository userRepository,
            WorkspaceListRepository workspaceListRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
        this.workspaceListRepository = workspaceListRepository;
    }

    public void createCard(String title, Long userId, Long workspaceListId) {
        if (userId == null || workspaceListId == null) {
            throw new BadRequestException("Either user id or workspace list id is null");
        }
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found creating card"));
        WorkspaceList workspaceList = this.workspaceListRepository.findById(workspaceListId)
                .orElseThrow(() -> new NotFoundException("Workspace Lis not found creating card"));

        this.cardRepository.save(new Card(title, user, workspaceList));
    }
}
