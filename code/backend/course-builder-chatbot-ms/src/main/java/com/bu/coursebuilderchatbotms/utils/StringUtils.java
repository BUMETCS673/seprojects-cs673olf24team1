package com.bu.coursebuilderchatbotms.utils;

public class StringUtils {
    /**
     * Converts a JSON array string with double quotes to a string with single quotes.
     *
     * @param jsonArray A string representing a JSON array with double quotes
     * @return A string with single quotes instead of double quotes
     */
    public static String convertJsonArrayToSingleQuotes(String jsonArray) {
        if (jsonArray == null || jsonArray.isEmpty()) {
            return "[]";
        }

        // Replace double quotes with single quotes, but only for the string values
        String converted = jsonArray.replaceAll("\"(\\d+)\"", "'$1'");

        return converted;
    }
}
