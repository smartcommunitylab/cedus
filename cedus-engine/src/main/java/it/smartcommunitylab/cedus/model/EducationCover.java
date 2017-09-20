package it.smartcommunitylab.cedus.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EducationCover {
	private List<TeachingUnit> tuList = new ArrayList<TeachingUnit>();
	private Map<String, DisctrictDistance> districtMap = new HashMap<String, DisctrictDistance>();
	
	public List<TeachingUnit> getTuList() {
		return tuList;
	}
	public void setTuList(List<TeachingUnit> tuList) {
		this.tuList = tuList;
	}
	public Map<String, DisctrictDistance> getDistrictMap() {
		return districtMap;
	}
	public void setDistrictMap(Map<String, DisctrictDistance> districtMap) {
		this.districtMap = districtMap;
	}
	
}
