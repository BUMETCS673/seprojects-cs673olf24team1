package com.bu.coursebuilderchatbotms.utils;

import java.util.ArrayList;
import java.util.List;

public class StringUtils {

    public static String convertJsonArrayToSingleQuotes(String jsonArray) {
        if (jsonArray == null || jsonArray.isEmpty()) {
            return "[]";
        }
        String converted = jsonArray.replaceAll("\"(\\d+)\"", "'$1'");
        return converted;
    }

    public static List<String> convertStringToStringArr(String input) {
        if (input == null || input.isEmpty()) {
            return new ArrayList<>();
        }
        input = input.replaceAll("'", "").replaceAll("\\[", "").replaceAll("\\]", "");
        String[] elements = input.split(",");
        List<String> result = new ArrayList<>();
        for (String element : elements) {
            result.add(element.trim());
        }
        return result;
    }
}
