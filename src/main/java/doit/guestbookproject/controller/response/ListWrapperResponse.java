package doit.guestbookproject.controller.response;

import java.util.List;
import lombok.Getter;

@Getter
public class ListWrapperResponse <T> {
    private List<T> result;

    public ListWrapperResponse(List<T> result) {
        this.result = result;
    }
}
