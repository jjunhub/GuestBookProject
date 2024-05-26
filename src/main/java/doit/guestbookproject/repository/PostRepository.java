package doit.guestbookproject.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findPostsByContentContainingOrTitleContainingOrderByCreatedAtDesc(String keyword1, String keyword2);
}
