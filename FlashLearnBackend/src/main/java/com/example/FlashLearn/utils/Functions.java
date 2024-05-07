package com.example.FlashLearn.utils;

import java.util.Random;

public abstract class Functions {

    public static Integer getRandom(int from,int to) {
        Random rand = new Random();
        return rand.nextInt(to - from +1) + from;
    }




}
