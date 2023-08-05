import path from "path";
import { test, expect } from "@playwright/test";
import { ApiRequests } from "../utils/functions";
import { ApiPayload } from "../fixture/payload";


// Fixtures data directory path
const fixturesDir = path.join(__dirname, "../fixtures/test_data");
const user_data = path.join(fixturesDir, "user_data.json");


test.describe.serial("Assessment For JSON Place Holder Tests", async () => {
    // User Data
    let result;
    let payload;
    let post_id;
    let postData = {
        title: 'This is sample title',
        description: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum'
    }

    test("Get List of Posts", async () => {
        result = await ApiRequests.GetResponse("posts?page=1");
        console.log(result)
        // expect(result.data.length).toBeGreaterThanOrEqual(1);
    });

    test("Get Single Post", async () => {
        result = await ApiRequests.GetResponse("posts/1");
        console.log(result)
        // expect(result.data.id).toEqual(2);
    });

    test("Negative Response for Regres Users (404)", async () => {
        result = await ApiRequests.NegativeGetResponse("api/users/11123");
        console.log(result)
        // Check if the object is empty using Object.keys()
        const isResultEmpty = Object.keys(result).length === 0;
        // Use the expect() function with a standard JavaScript assertion
        expect(isResultEmpty).toBeTruthy();
    });

    test("Post a New Article Post", async () => {
        payload = ApiPayload.Article_Post(postData.title, postData.description)
        result = await ApiRequests.PostResponse("posts", payload);
        console.log(result)
        post_id = result.id
        expect(result.title).toEqual(postData.title);
        expect(result.body).toEqual(postData.description);
    });

    test("Put/Update previously created Post", async () => {
        payload = ApiPayload.Article_Post(postData.title, postData.description)
        result = await ApiRequests.PutResponse(`posts/1`, payload);
        console.log(result)
        expect(result.title).toEqual(postData.title);
        expect(result.body).toEqual(postData.description);
    });

    test("Delete previously created Post", async () => {
        result = await ApiRequests.DeleteResponse(`posts/${post_id}`);
        console.log(result)
    });

});
