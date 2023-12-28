package com.wecare.wecare.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecare.wecare.DTO.PatientRecordResponse;
import com.wecare.wecare.DTO.PatientsList;
import com.wecare.wecare.Entity.Appointment;
import com.wecare.wecare.Entity.Patient;
import com.wecare.wecare.Repository.AppointmentRepository;
import com.wecare.wecare.Repository.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Patient getPatient(Integer id) {
        Optional<Patient> gotPatient = this.patientRepository.findById(id);
        if (gotPatient.isPresent()) {
            return gotPatient.get();
        } else {
            return null;
        }
    }

    public String createPatient(Patient newPatient) {
        try {
            this.patientRepository.save(newPatient);
            return "Success";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public String deletePatient(Integer id) {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            List<Appointment> appointments = patient.get().getAppointmentsList();
            for (Appointment appointment : appointments) {
                appointmentRepository.delete(appointment);
            }
            patientRepository.delete(patient.get());
            return ("Success");
        } else {
            return ("Patient Not Found!");
        }
    }

    public List<PatientsList> listPatients() {
        try {
            List<Patient> allPatients = (List<Patient>) this.patientRepository.findAll();

            List<PatientsList> patientsList = new ArrayList<>();

            for (Patient eachPatient : allPatients) {
                PatientsList listItem = new PatientsList();

                listItem.setId(eachPatient.getId());
                listItem.setName(eachPatient.getName());
                listItem.setBloodGroup(eachPatient.getBloodGroup());
                listItem.setDOB(eachPatient.getDOB());
                listItem.setWeight(eachPatient.getWeight());
                listItem.setHeight(eachPatient.getHeight());
                listItem.setContact(eachPatient.getContact());
                listItem.setEmail(eachPatient.getEmail());
                listItem.setPassword(eachPatient.getPassword());

                patientsList.add(listItem);
            }

            return patientsList;
        } catch (Exception e) {
            return null;
        }
    }

    public List<PatientRecordResponse> listPrescriptionByPid(Integer id) {
        try {
            Optional<Patient> gotPatient = this.patientRepository.findById(id);

            if (gotPatient.isPresent()) {
                
                List<Appointment> patientAppo = gotPatient.get().getAppointmentsList();

                List<PatientRecordResponse> prelist = new ArrayList<>();
                for (Appointment eachAppo : patientAppo) {

                    if(eachAppo.getPrescription() != null){
                        PatientRecordResponse listItem = new PatientRecordResponse();
                        listItem.setPreid(eachAppo.getPrescription().getId());
                        listItem.setBillNo(eachAppo.getPrescription().getId());
                        listItem.setBillAmount(eachAppo.getPrescription().getBillAmount());
                        listItem.setTest(eachAppo.getPrescription().getTest());
                        listItem.setTestResult(eachAppo.getPrescription().getTestResult());
                        listItem.setPrescription(eachAppo.getPrescription().getPrescription());
                        listItem.setBodyPartName(eachAppo.getPrescription().getBodyPartName());
                        listItem.setxRayImageLink(eachAppo.getPrescription().getXRayImageLink());
                        listItem.setSurgeryTime(eachAppo.getPrescription().getSurgeryTime());
                        listItem.setDate(eachAppo.getDate().toString());
                        listItem.setType(eachAppo.getType());
                        listItem.setDoctorName(eachAppo.getDoctor().getName());

                        prelist.add(listItem);
                    }else{
                        continue;
                    }
                }
                // System.out.println("prelist");
                // System.out.println(prelist);
                return prelist;

            } else {
                return Collections.<PatientRecordResponse>emptyList();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Collections.<PatientRecordResponse>emptyList();
        }
    }

    public String[] login(String username, String pass) {

        List<Patient> patient = this.patientRepository.findByEmailAndPassword(username, pass);
        String[] data = new String[2];
        if (patient != null && !patient.isEmpty()) {
            data[0] = "" + patient.get(0).getId();
            data[1] = "Success";
            return data;
        } else {
            data[0] = "";
            data[1] = "failed";
            return data;
        }
    }

}
