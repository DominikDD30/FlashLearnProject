package com.example.FlashLearn.infractructure.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PexelPhotosResponse {
    private int total_results;
    private int page;
    private int per_page;
    private List<PexelPhoto> photos;
    private String alt;
}
