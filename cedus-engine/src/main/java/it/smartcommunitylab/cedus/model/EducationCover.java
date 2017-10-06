package it.smartcommunitylab.cedus.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EducationCover {
	private List<TeachingUnit> tuList = new ArrayList<TeachingUnit>();
	private Map<String, DistrictDistance> districtMap = new HashMap<String, DistrictDistance>();
	
	public List<TeachingUnit> getTuList() {
		return tuList;
	}
	public void setTuList(List<TeachingUnit> tuList) {
		this.tuList = tuList;
	}
	public Map<String, DistrictDistance> getDistrictMap() {
		return districtMap;
	}
	public void setDistrictMap(Map<String, DistrictDistance> districtMap) {
		this.districtMap = districtMap;
	}
	
}
