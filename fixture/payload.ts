export class ApiPayload {

    public static Article_Post(title, description) {
        return {
            "title": title,
            "body": description,
        }
    }

}
