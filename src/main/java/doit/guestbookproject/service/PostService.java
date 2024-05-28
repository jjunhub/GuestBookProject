package doit.guestbookproject.service;

import doit.guestbookproject.controller.response.ListWrapperResponse;
import doit.guestbookproject.controller.response.PostResponse;
import doit.guestbookproject.controller.response.PostSummaryResponse;
import doit.guestbookproject.controller.request.PostWriteRequest;
import doit.guestbookproject.controller.response.PostWriteResponse;
import doit.guestbookproject.repository.Post;
import doit.guestbookproject.repository.PostRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {

    private final PostRepository postRepository;

    public PostWriteResponse writePost(PostWriteRequest postWriteRequest) {
        Post post = Post.builder()
                .title(postWriteRequest.getTitle())
                .content(postWriteRequest.getContent())
                .createdAt(LocalDateTime.now())
                .likes(0)
                .build();

        Post save = postRepository.save(post);
        return new PostWriteResponse(save.getPostId());
    }

    public ListWrapperResponse<PostSummaryResponse> searchPost(String keyword) {
        List<Post> searchResult = postRepository.findPostsByContentContainingOrTitleContainingOrderByCreatedAtDesc(
                keyword, keyword);

        List<PostSummaryResponse> postSummaryResponseList = searchResult.stream().map(
                post -> PostSummaryResponse.builder()
                        .postId(post.getPostId())
                        .title(post.getTitle())
                        .content(post.getContent())
                        .likes(post.getLikes())
                        .build()
        ).toList();

        return new ListWrapperResponse<>(postSummaryResponseList);
    }

    public PostResponse findOnePost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new RuntimeException("Not Found Post")
        );

        return PostResponse.builder()
                .postId(post.getPostId())
                .title(post.getTitle())
                .content(post.getContent())
                .likes(post.getLikes())
                .createdAt(post.getCreatedAt())
                .build();
    }

    public void likePost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new RuntimeException("Not Found Post")
        );

        post.addLikeCount();
    }
}
