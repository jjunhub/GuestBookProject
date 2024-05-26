package doit.guestbookproject.controller;

import doit.guestbookproject.controller.request.PostWriteRequest;
import doit.guestbookproject.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author sangjun
 */
@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    /**
     * 방명록 등록하기
     * @param postWriteRequest
     * @return { postId }
     */
    @PostMapping("/posts")
    public ResponseEntity writePost(@RequestBody PostWriteRequest postWriteRequest){
        return ResponseEntity.ok(postService.writePost(postWriteRequest));
    }

    /**
     * 방명록 조회하기
     * @param keyword
     * @return { result : [ postSummaryResponse ] }
     */
    @GetMapping("/posts")
    public ResponseEntity searchPost(@RequestParam(defaultValue = "") String keyword){
        return ResponseEntity.ok(postService.searchPost(keyword));
    }

    /**
     * 방명록 1개 조회하기
     * @param postId
     * @return { post }
     */
    @GetMapping("/posts/{postId}")
    public ResponseEntity findOnePost(@PathVariable Long postId){
        return ResponseEntity.ok(postService.findOnePost(postId));
    }

    /**
     * 방명록 좋아요 누르기
     * @param postId
     * @return "{}"
     */
    @PutMapping("/posts/{postId}/likes")
    public ResponseEntity likePost(@PathVariable Long postId){
        postService.likePost(postId);
        return ResponseEntity.ok("{}");
    }
}


