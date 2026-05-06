package backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "quotations")
@Data
public class Quotation {
    @Id
    private String id;
    private String customerName;
    private String email;
    private String phone;
    private String requestContent;
    /** Phiên chat (UUID từ widget), ghi nhận khi khách gửi yêu cầu báo giá qua chatbot */
    private String sessionId;
    /** Ví dụ: chatbot, web_form */
    private String source;
    private LocalDateTime createdAt = LocalDateTime.now();
}