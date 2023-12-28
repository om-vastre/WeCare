package com.wecare.wecare.DTO;

public class PrescriptionRequest {

    private Integer Id;
    private Integer BillAmount;
    private String Test;
    private String TestResult;
    private String Prescription;
    private String BodyPartName;
    private String XRayImageLink;
    private String SurgeryTime;
    private Integer appointment;
    
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
    public Integer getAppointment() {
        return appointment;
    }
    public void setAppointment(Integer appointment) {
        this.appointment = appointment;
    }

}
