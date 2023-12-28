package com.wecare.wecare.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wecare.wecare.Component.Validation;
import com.wecare.wecare.DTO.AppointmentListResponse;
import com.wecare.wecare.DTO.AppointmentRequest;
import com.wecare.wecare.Entity.Appointment;
import com.wecare.wecare.Entity.Doctor;
import com.wecare.wecare.Entity.Patient;
import com.wecare.wecare.Entity.Prescription;
import com.wecare.wecare.Repository.DoctorRepository;
import com.wecare.wecare.Repository.PatientRepository;
import com.wecare.wecare.Repository.PrescriptionRepository;
import com.wecare.wecare.Service.AppointmentService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;


@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {


    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private Validation validation;

    @GetMapping(value="/{id}")
    public ResponseEntity<Appointment> getAppointment(@PathVariable("id") Integer id, @RequestHeader(name = "Token", required = true) String token) {
        
        if(!validation.isValidAppo(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        Appointment gotAppointment = this.appointmentService.getAppointment(id);
        
        if (gotAppointment != null){
            System.out.println("Appointment Details : ");
            System.out.println(gotAppointment.getNo());
            System.out.println(gotAppointment.getDate());
            System.out.println(gotAppointment.getTime());
            System.out.println(gotAppointment.getDoctor().getName());
            return ResponseEntity.ok(gotAppointment);
        }
        else{
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @PostMapping(value="/create")
    public ResponseEntity<String> createAppointment(@RequestBody AppointmentRequest request, @RequestHeader(name = "Token", required = true) String token) {

        if(!validation.isValidAppo(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        Optional<Doctor> doctor = doctorRepository.findById(request.getDoctorId());
        Optional<Patient> patient = patientRepository.findById(request.getPatientId());
        Optional<Prescription> prescription;
        if(request.getPrescriptionId()==0){
            prescription = null;
        }else{
            prescription = prescriptionRepository.findById(request.getPrescriptionId());
        }

        if(doctor.isPresent() && patient.isPresent() ){
            Appointment newAppointment = new Appointment();
            
            newAppointment.setNo(request.getNo());
            newAppointment.setDate(request.getDate());
            newAppointment.setTime(request.getTime());
            newAppointment.setType(request.getType());
            newAppointment.setStatus(request.getStatus());
            newAppointment.setDoctor(doctor.get());
            newAppointment.setPatient(patient.get());

            if(prescription==null){
                newAppointment.setPrescription(null);
            }else{
                newAppointment.setPrescription(prescription.get());
            }

            String result = appointmentService.createAppointment(newAppointment);

            if(result.equals("Success")){
                // return ResponseEntity.status(HttpStatus.CREATED).body("{\"Success\":\"Operation successful.\"}");
                return ResponseEntity.status(HttpStatus.CREATED).body("Appointment created successfully.");
            }
            else{
                System.out.println("Error while new appointment creation : " + result);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create appointment.");
            }
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found.");
        }

    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable("id") Integer id, @RequestHeader(name = "Token", required = true) String token){

        if(!validation.isValidAppo(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        String result = this.appointmentService.deleteAppointment(id);
        if(result.equals("Success")){
            return ResponseEntity.status(HttpStatus.OK).body("Appintment Deleted Successfully.");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Appointment ID.");
        }
    }




    @GetMapping("/list/did/{id}")
    public ResponseEntity<List<AppointmentListResponse>> getAppointmentsByDid(@PathVariable int id, @RequestHeader(name = "Token", required = true) String token){
        
        if(!validation.isValidAppo(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        List<AppointmentListResponse> appointments=this.appointmentService.getAppointmentsByDid(id);

        if( !appointments.isEmpty() ){
            return ResponseEntity.ok(appointments);
        }
        else{
            return ResponseEntity.noContent().build();
        }
    }


    @GetMapping("/list/pid/{id}")
    public ResponseEntity<List<AppointmentListResponse>> getAppointmentsByPid(@PathVariable int id, @RequestHeader(name = "Token", required = true) String token){
        
        if(!validation.isValidAppo(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        List<AppointmentListResponse> appointments=this.appointmentService.getAppointmentsByPid(id);

        if( !appointments.isEmpty() ){
            return ResponseEntity.ok(appointments);
        }
        else{
            return ResponseEntity.noContent().build();
        }
    }



}
