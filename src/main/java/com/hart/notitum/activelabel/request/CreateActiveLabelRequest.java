package com.hart.notitum.activelabel.request;

public class CreateActiveLabelRequest {
    private Long labelId;
    private Boolean checked;
    private Long cardId;

    public CreateActiveLabelRequest() {

    }

    public CreateActiveLabelRequest(Long labelId, Boolean checked, Long cardId) {
        this.labelId = labelId;
        this.checked = checked;
        this.cardId = cardId;
    }

    public Boolean getChecked() {
        return checked;
    }

    public Long getCardId() {
        return cardId;
    }

    public Long getLabelId() {
        return labelId;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public void setLabelId(Long labelId) {
        this.labelId = labelId;
    }
}
