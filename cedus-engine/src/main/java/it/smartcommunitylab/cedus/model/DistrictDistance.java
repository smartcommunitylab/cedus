package it.smartcommunitylab.cedus.model;

public class DistrictDistance {
	private String codiceIstat;
	private Double carDistance;
	private Double transitDistance;
	private Double carTime;
	private Double transitTime;	
	
	public String getCodiceIstat() {
		return codiceIstat;
	}
	public void setCodiceIstat(String codiceIstat) {
		this.codiceIstat = codiceIstat;
	}
	public Double getCarDistance() {
		return carDistance;
	}
	public void setCarDistance(Double carDistance) {
		this.carDistance = carDistance;
	}
	public Double getTransitDistance() {
		return transitDistance;
	}
	public void setTransitDistance(Double transitDistance) {
		this.transitDistance = transitDistance;
	}
	public Double getCarTime() {
		return carTime;
	}
	public void setCarTime(Double carTime) {
		this.carTime = carTime;
	}
	public Double getTransitTime() {
		return transitTime;
	}
	public void setTransitTime(Double transitTime) {
		this.transitTime = transitTime;
	}
}
