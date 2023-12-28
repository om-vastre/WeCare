package com.wecare.wecare.Controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.wecare.wecare.Entity.Prescription;
import com.wecare.wecare.Repository.AppointmentRepository;
import com.wecare.wecare.Component.Validation;
import com.wecare.wecare.Entity.Appointment;
import com.wecare.wecare.Service.PrescriptionService;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionController {
    @Autowired
    private PrescriptionService prescriptionService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private Validation validation;

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescription(
            @PathVariable("id") Integer id,
            @RequestHeader(name = "Token", required = true) String token) {
        // public ResponseEntity<Prescription> getPrescription(@PathVariable("id")
        // Integer id ){

        // HttpHeaders header = getToken(token);

        if (!validation.isValidPre(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Prescription prescription = this.prescriptionService.getPrescription(id);
        if (prescription != null) {
            // return ResponseEntity.ok().headers(header).body(prescription);
            return ResponseEntity.status(HttpStatus.OK).body(prescription);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/create")
    public ResponseEntity<String> createPrescription(
            // @RequestBody PrescriptionRequest request,
            @RequestHeader(name = "Token", required = true) String token,
            @RequestParam(name = "img", required = false) MultipartFile img,
            @RequestParam("id") Integer id,
            @RequestParam("appointment") Integer appointmentId,
            @RequestParam("prescription") String prescription,
            @RequestParam("bodyPartName") String bodyPartName,
            @RequestParam("test") String test,
            // @RequestParam("xrayImageLink") String xrayImageLink,
            @RequestParam("testResult") String testResult,
            @RequestParam("billAmount") Integer billAmount,
            @RequestParam("surgeryTime") String surgeryTime) {

        if (!validation.isValidPre(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);

        if (appointment.isPresent()) {
            Prescription newPrescription = new Prescription();

            String Path = "";
            try {
                Path = new ClassPathResource("static/images/").getFile().getAbsolutePath();
                System.out.println(Path);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Path not found!");
            }
            newPrescription.setId(id);
            newPrescription.setAppointment(appointment.get());
            newPrescription.setPrescription(prescription);
            newPrescription.setBodyPartName(bodyPartName);
            newPrescription.setTest(test);
            if (img != null) {
                newPrescription.setXRayImageLink(ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/images/" + img.getOriginalFilename()).toUriString());

                try {
                    Files.copy(img.getInputStream(), Paths.get(Path + File.separator + img.getOriginalFilename()),
                            StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image!");
                }
            } else {
                newPrescription.setXRayImageLink("");
            }

            newPrescription.setTestResult(testResult);
            newPrescription.setBillAmount(billAmount);
            newPrescription.setSurgeryTime(surgeryTime);

            Prescription savedPre = prescriptionService.createPrescription(newPrescription);

            if (!Objects.isNull(savedPre)) {
                // return
                // ResponseEntity.status(HttpStatus.CREATED).body("{\"Success\":\"Operation
                // successful.\"}");
                appointment.get().setPrescription(savedPre);
                appointment.get().setStatus("Completed");
                this.appointmentRepository.save(appointment.get());
                return ResponseEntity.status(HttpStatus.CREATED).body("Prescription created successfully.");
            } else {
                System.out.println("Error while new prescription creation!");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create prescription.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found.");
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePrescription(
            @RequestHeader(name = "Token", required = true) String token,
            @PathVariable("id") Integer id) {

        if (!validation.isValidPre(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String result = this.prescriptionService.deletePrescription(id);
        if (result.equals("Success")) {
            return ResponseEntity.status(HttpStatus.OK).body("Prescription Deleted Successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Prescription ID.");
        }
    }

}
