package com.example.Backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;


@Service
public class CloudinaryService {


    private final Cloudinary cloudinary;


    public CloudinaryService(Cloudinary cloudinary) {

        this.cloudinary = cloudinary;

    }




    public String uploadImage(MultipartFile file) {

        try {

            Map uploadResult = cloudinary.uploader()
                    .upload(
                            file.getBytes(),
                            ObjectUtils.emptyMap()
                    );


            return uploadResult
                    .get("secure_url")
                    .toString();


        } catch (IOException e) {

            throw new RuntimeException(
                    "Image upload failed",
                    e
            );

        }

    }




    public void deleteImage(String publicId) {

        try {

            cloudinary.uploader()
                    .destroy(
                            publicId,
                            ObjectUtils.emptyMap()
                    );


        } catch (IOException e) {

            throw new RuntimeException(
                    "Image deletion failed",
                    e
            );

        }

    }

}
