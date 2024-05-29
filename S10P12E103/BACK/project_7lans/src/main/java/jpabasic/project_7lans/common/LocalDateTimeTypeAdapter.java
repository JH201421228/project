package jpabasic.project_7lans.common;

import com.google.gson.*;
import org.springframework.context.annotation.Configuration;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
public class LocalDateTimeTypeAdapter implements JsonSerializer<LocalDateTime>, JsonDeserializer<LocalDateTime> {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    public JsonElement serialize(LocalDateTime localDateTime, Type srcType,
                                 JsonSerializationContext context) {
        System.out.println("이거 하는 중 : JsonElement Serialize");
        System.out.println(localDateTime + "\n" + srcType + "\n" + context);
        // LocalDateTime을 formatter를 사용하여 문자열로 직렬화하고, JsonPrimitive로 감싸서 반환
        return new JsonPrimitive(formatter.format(localDateTime));
    }

    @Override
    public LocalDateTime deserialize(JsonElement json, Type typeOfT,
                                     JsonDeserializationContext context) throws JsonParseException {
        System.out.println("이거 하는 중 : JsonElement Deserialize");
        System.out.println(json + "\n" + typeOfT + "\n" + context);

        // JSON 문자열을 가져와서 formatter를 사용하여 LocalDateTime으로 역직렬화하여 반환
        return LocalDateTime.parse(json.getAsString(), formatter);
    }
}
