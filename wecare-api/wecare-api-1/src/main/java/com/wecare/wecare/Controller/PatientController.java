package com.wecare.wecare.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wecare.wecare.Component.Validation;
import com.wecare.wecare.DTO.PatientRecordResponse;
import com.wecare.wecare.DTO.PatientsList;
import com.wecare.wecare.Entity.Patient;
import com.wecare.wecare.Service.PatientService;

@RestController
@RequestMapping("/api/patient")
public class PatientController {
    
    @Autowired
    private PatientService patientService;

    @Autowired
    private Validation validation;

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable("id") Integer id, @RequestHeader(name = "Token", required = true) String token){

        if(!validation.isValidPatient(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

       Patient gotPatient = this.patientService.getPatient(id);
        if (gotPatient != null){
            // return ResponseEntity.status(HttpStatus.OK).body(gotPatient);
            return ResponseEntity.ok(gotPatient);
        }
        else{
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createPatient(@RequestBody Patient newPatient, @RequestHeader(name = "Token", required = true) String token){

        if(!validation.isValidPatient(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        String result = patientService.createPatient(newPatient);

        if(result.equals("Success")){
            return ResponseEntity.status(HttpStatus.OK).body("{\"Success\":\"Operation successful.\"}");
        }
        else{
            System.out.println("Error while new patient creation : " + result);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"Error\":\"Failed to create new patient!\"}");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable("id") Integer id, @RequestHeader(name = "Token", required = true) String token){

        if(!validation.isValidPatient(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}
        
        String result = this.patientService.deletePatient(id);

        if(result.equals("Success")){
            return ResponseEntity.status(HttpStatus.OK).body("Patient and associated appointments deleted successfully.");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to delete patient and associated appointments!");
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<PatientsList>> listPatients(@RequestHeader(name = "Token", required = true) String token){

        if(!validation.isValidPatient(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        List<PatientsList> patientsList = this.patientService.listPatients();
        if(patientsList != null){
            return ResponseEntity.ok(patientsList);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/list/prescription/{id}")
    public ResponseEntity<List<PatientRecordResponse>> listPrescriptionByPid(@PathVariable("id") Integer id,@RequestHeader(name = "Token", required = true) String token){

        if(!validation.isValidPatient(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        List<PatientRecordResponse> preList = this.patientService.listPrescriptionByPid(id);
        
        // System.out.println(id);
        // System.out.println(preList);
        if(!preList.isEmpty()){
            return ResponseEntity.ok(preList);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


}


