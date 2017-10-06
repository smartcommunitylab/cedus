package it.smartcommunitylab.cedus.map;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Town {

	private String name;
	private String istat;
	private double lat;
	private double lon;
	private int index;
	
	@JsonIgnore
	private Integer[] transitTimes;
	@JsonIgnore
	private Integer[] carTimes;
	@JsonIgnore
	private Integer[] transitDistances;
	@JsonIgnore
	private Integer[] carDistances;	
	@JsonIgnore
	private String[] transitPolylines;
	@JsonIgnore
	private String[] carPolylines;	
	
	public Town() {
	}

	public Town(String name, int index, String istat, double lat, double lon) {
		super();
		this.name = name;
		this.index = index;
		this.istat = istat;
		this.lat = lat;
		this.lon = lon;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public String getIstat() {
		return istat;
	}

	public void setIstat(String istat) {
		this.istat = istat;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	public Integer[] getTransitTimes() {
		return transitTimes;
	}

	public void setTransitTimes(Integer[] transitDistances) {
		this.transitTimes = transitDistances;
	}

	public Integer[] getCarTimes() {
		return carTimes;
	}

	public void setCarTimes(Integer[] carDistances) {
		this.carTimes = carDistances;
	}

	public Integer[] getTransitDistances() {
		return transitDistances;
	}

	public void setTransitDistances(Integer[] transitDistances) {
		this.transitDistances = transitDistances;
	}

	public Integer[] getCarDistances() {
		return carDistances;
	}

	public void setCarDistances(Integer[] carDistances) {
		this.carDistances = carDistances;
	}

	public String[] getTransitPolylines() {
		return transitPolylines;
	}

	public void setTransitPolylines(String[] transitPolylines) {
		this.transitPolylines = transitPolylines;
	}

	public String[] getCarPolylines() {
		return carPolylines;
	}

	public void setCarPolylines(String[] carPolylines) {
		this.carPolylines = carPolylines;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((istat == null) ? 0 : istat.hashCode());
		long temp;
		temp = Double.doubleToLongBits(lat);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(lon);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Town other = (Town) obj;
		if (istat == null) {
			if (other.istat != null)
				return false;
		} else if (!istat.equals(other.istat))
			return false;
		if (Double.doubleToLongBits(lat) != Double.doubleToLongBits(other.lat))
			return false;
		if (Double.doubleToLongBits(lon) != Double.doubleToLongBits(other.lon))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	@Override
	public String toString() {
//		return istat + " = " + name + " [" + lat + "," + lon + "]";
		return name;
	}
	
}
