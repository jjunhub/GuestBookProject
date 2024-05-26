package doit.guestbookproject.controller.response;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PostResponse {
    private Long postId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Integer likes;

    @Builder
    public PostResponse(Long postId, String title, String content, LocalDateTime createdAt, Integer likes) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.likes = likes;
    }
}
