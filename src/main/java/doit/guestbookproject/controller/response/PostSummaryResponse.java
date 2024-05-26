package doit.guestbookproject.controller.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PostSummaryResponse {
    private Long postId;
    private String title;
    private String content;
    private Integer likes;

    @Builder
    public PostSummaryResponse(Long postId, String title, String content, Integer likes) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.likes = likes;
    }
}
