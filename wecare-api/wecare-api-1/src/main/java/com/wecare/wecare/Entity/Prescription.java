package com.wecare.wecare.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private Integer BillAmount;

    private String Test;
    private String TestResult;

    private String Prescription;

    private String BodyPartName;
    private String XRayImageLink;
    
    private String SurgeryTime;

    @OneToOne(mappedBy = "prescription", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIdentityReference(alwaysAsId = true)
    private Appointment appointment;

    // @ManyToOne
    // // @JsonBackReference
    // @JsonIdentityReference(alwaysAsId = true)
    // private Patient patientprescription;

    
    public Prescription(Integer id, Integer billAmount, String test, String testResult, String prescription,
            String bodyPartName, String xRayImageLink, String surgeryTime, Appointment appointment) {
        Id = id;
        BillAmount = billAmount;
        Test = test;
        TestResult = testResult;
        Prescription = prescription;
        BodyPartName = bodyPartName;
        XRayImageLink = xRayImageLink;
        SurgeryTime = surgeryTime;
        this.appointment = appointment;
    }

    public Prescription() {
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getBillAmount() {
        return BillAmount;
    }

    public void setBillAmount(Integer billAmount) {
        BillAmount = billAmount;
    }

    public String getTest() {
        return Test;
    }

    public void setTest(String test) {
        Test = test;
    }

    public String getTestResult() {
        return TestResult;
    }

    public void setTestResult(String testResult) {
        TestResult = testResult;
    }

    public String getPrescription() {
        return Prescription;
    }

    public void setPrescription(String prescription) {
        Prescription = prescription;
    }

    public String getBodyPartName() {
        return BodyPartName;
    }

    public void setBodyPartName(String bodyPartName) {
        BodyPartName = bodyPartName;
    }

    public String getXRayImageLink() {
        return XRayImageLink;
    }

    public void setXRayImageLink(String xRayImageLink) {
        XRayImageLink = xRayImageLink;
    }

    public String getSurgeryTime() {
        return SurgeryTime;
    }

    public void setSurgeryTime(String surgeryTime) {
        SurgeryTime = surgeryTime;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }


}
