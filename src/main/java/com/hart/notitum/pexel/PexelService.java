package com.hart.notitum.pexel;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.json.*;

@Service
public class PexelService {

    @Value("${pexels}")
    private String pexelsKey;

    public List<String> getPexelBackgrounds(int page, int perPage, String query) {
        try {
            return getInitial(
                    "https://api.pexels.com/v1/search?query=" + query + "&page=" + page + "&per_page=" + perPage);

        } catch (IOException e) {
            e.printStackTrace();
            List<String> list = new ArrayList<>();
            return list;

        }
    }

    private List<String> getInitial(String endpoint) throws IOException {
        URL getUrl = new URL(endpoint);

        HttpURLConnection connection = (HttpURLConnection) getUrl.openConnection();

        connection.setRequestMethod("GET");
        connection.setRequestProperty("Authorization", pexelsKey);

        int responseCode = connection.getResponseCode();

        if (responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuffer jsonResponseData = new StringBuffer();
            String readLine = null;
            while ((readLine = in.readLine()) != null) {
                jsonResponseData.append(readLine);
            }

            in.close();
            return parseJsonResults(jsonResponseData.toString());
        } else {
            List<String> list = new ArrayList<>();
            return list;
        }
    }

    private List<String> parseJsonResults(String jsonResponseData) {
        List<String> photos = new ArrayList<>();
        JSONObject obj = new JSONObject(jsonResponseData);
        JSONArray arr = obj.getJSONArray("photos");

        for (int i = 0; i < arr.length(); i++) {
            String photo = arr
                    .getJSONObject(i)
                    .getJSONObject("src")
                    .get("large")
                    .toString();
            photos.add(photo);
        }
        return photos;
    }
}
