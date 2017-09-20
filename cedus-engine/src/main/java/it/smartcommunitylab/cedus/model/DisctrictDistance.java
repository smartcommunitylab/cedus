package it.smartcommunitylab.cedus.model;

public class DisctrictDistance {
	private String codiceIstat;
	private Double carDistance;
	private Double transitDistance;
	
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
}
