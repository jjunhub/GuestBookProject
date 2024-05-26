package doit.guestbookproject.controller.request;

import lombok.Getter;

@Getter
public class PostWriteRequest {
    private String title;
    private String content;

    public PostWriteRequest(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
