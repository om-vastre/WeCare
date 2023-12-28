package com.wecare.wecare.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.wecare.wecare.Component.Validation;
import com.wecare.wecare.DTO.DoctorsList;
import com.wecare.wecare.Entity.Appointment;
import com.wecare.wecare.Entity.Doctor;
import com.wecare.wecare.Service.DoctorService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private Validation validation;

    @PostMapping("/create")
    public ResponseEntity<String> createDoctor(@RequestBody Doctor newDoctor, @RequestHeader(name = "Token", required = true) String token){

        if(!validation.isValidDoc(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        String result = doctorService.createDoctor(newDoctor);

        if(result.equals("Success")){
            return ResponseEntity.status(HttpStatus.OK).body("{\"Success\":\"Operation successful.\"}");
        }
        else{
            System.out.println("Error while new doctor creation : " + result);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"Error\":\"Failed to create new doctor!\"}");
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctor(@PathVariable("id") Integer id, @RequestHeader(name = "Token", required = true) String token) {

        if(!validation.isValidDoc(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        Doctor gotDoctor = this.doctorService.getDoctor(id);
        if (gotDoctor != null){
            // System.out.println("Doctor Details : ");
            // System.out.println(gotDoctor.getId());
            // System.out.println(gotDoctor.getName());
            // System.out.println(gotDoctor.getContactNo());
            // System.out.println(gotDoctor.getUsername());

            // List<Appointment> appointmentList = gotDoctor.getAppointmentList();

            // for (Appointment appo : appointmentList) {
            //   System.out.println(appo.toString());
            //   System.out.println(appo.getDoctor().getName());
            // }

            // return ResponseEntity.status(HttpStatus.OK).body(gotDoctor);
            return ResponseEntity.ok(gotDoctor);
        }
        else{
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
 

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable("id") Integer id, @RequestHeader(name = "Token", required = true) String token){

        if(!validation.isValidDoc(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}
        
        String result = this.doctorService.deleteDoctor(id);

        if(result.equals("Success")){
            return ResponseEntity.status(HttpStatus.OK).body("Doctor and associated appointments deleted successfully.");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to delete doctor and associated appointments!");
        }
    }


    @GetMapping("/list")
    public ResponseEntity<List<DoctorsList>> listDoctors(@RequestHeader(name = "Token", required = true) String token){

        if(!validation.isValidDoc(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        List<DoctorsList> doctorsList = this.doctorService.listDoctors();
        if(doctorsList != null){
            return ResponseEntity.ok(doctorsList);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
