package doit.guestbookproject.controller.response;

import lombok.Getter;

@Getter
public class PostWriteResponse {
    private Long postId;

    public PostWriteResponse(Long postId) {
        this.postId = postId;
    }
}
