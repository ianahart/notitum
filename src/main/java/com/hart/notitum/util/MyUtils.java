package com.hart.notitum.util;

public final class MyUtils {

    private MyUtils() {

    }

    public static String capitalize(String text) {
        return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
    }
}
