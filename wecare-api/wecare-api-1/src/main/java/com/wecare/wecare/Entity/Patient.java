package com.wecare.wecare.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private String Name;
    private String BloodGroup;
    private String DOB;
    private String Weight;
    private String Height;
    private String Contact;
    private String email;
    private String password;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIdentityReference(alwaysAsId = true)
    private List<Appointment> AppointmentsList;

    // @OneToMany(mappedBy = "patientprescription", cascade = CascadeType.ALL, orphanRemoval = true)
    // @JsonIdentityReference(alwaysAsId = true)
    // private List<Prescription> PrescriptionsList;
    
    public Patient(Integer id, String name, String bloodGroup, String dOB, String weight, String height, String contact,
            String email, String password, List<Appointment> appointmentsList) {
        Id = id;
        Name = name;
        BloodGroup = bloodGroup;
        DOB = dOB;
        Weight = weight;
        Height = height;
        Contact = contact;
        this.email = email;
        this.password = password;
        AppointmentsList = appointmentsList;
    }

    public Patient() {
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getBloodGroup() {
        return BloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        BloodGroup = bloodGroup;
    }

    public String getDOB() {
        return DOB;
    }

    public void setDOB(String dOB) {
        DOB = dOB;
    }

    public String getWeight() {
        return Weight;
    }

    public void setWeight(String weight) {
        Weight = weight;
    }

    public String getHeight() {
        return Height;
    }

    public void setHeight(String height) {
        Height = height;
    }

    public String getContact() {
        return Contact;
    }

    public void setContact(String contact) {
        Contact = contact;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Appointment> getAppointmentsList() {
        return AppointmentsList;
    }

    public void setAppointmentsList(List<Appointment> appointmentsList) {
        AppointmentsList = appointmentsList;
    }

}
