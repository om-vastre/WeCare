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
import com.wecare.wecare.Entity.Nurse;
import com.wecare.wecare.Service.NurseService;

@RestController
@RequestMapping("/api/nurse")
public class NurseController {

    @Autowired
    private NurseService nurseService;

    @Autowired
    private Validation validation;
    
    @GetMapping("/{id}")
    public ResponseEntity<Nurse> getNurse(@PathVariable("id") Integer id, @RequestHeader(name = "Token", required = true) String token){

        if(!validation.isValidNurse(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        if(id != null){
            Nurse gotNurse = this.nurseService.getNurse(id);
            return ResponseEntity.status(HttpStatus.OK).body(gotNurse);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNurse(@RequestBody Nurse newNurse, @RequestHeader(name = "Token", required = true) String token){

        if(!validation.isValidNurse(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        if (newNurse != null){
            String result = this.nurseService.createNurse(newNurse);
            if(result.equals("Success")){
                return ResponseEntity.status(HttpStatus.CREATED).body("New nurse created.");
            }else{
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create nurse!");
            }
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request body!");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNurse(@PathVariable("id") Integer id, @RequestHeader(name = "Token", required = true) String token){

        if(!validation.isValidNurse(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        if(this.nurseService.deleteNurse(id).equals("Success")){
            return ResponseEntity.status(HttpStatus.OK).body("Nurse deleted successfully.");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Id");
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Nurse>> listNurse(@RequestHeader(name = "Token", required = true) String token){
        System.out.println(token);
        if(!validation.isValidNurse(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        List<Nurse> nurseList = this.nurseService.listNurse();
        if(nurseList.isEmpty() || nurseList == null){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok().body(nurseList);
        }
    }



}
