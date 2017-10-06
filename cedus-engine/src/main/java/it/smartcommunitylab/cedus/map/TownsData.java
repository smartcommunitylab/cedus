package it.smartcommunitylab.cedus.map;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Charsets;
import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.io.Resources;

import it.smartcommunitylab.cedus.model.DistrictDistance;
import it.smartcommunitylab.cedus.model.TeachingUnit;

@Component
public class TownsData {

	public enum SeparationType {
		CAR_DISTANCE, CAR_TIME, TRANSIT_DISTANCE, TRANSIT_TIME
	};

	private static final String ISTAT_PREFIX = "022";

	@Autowired
	@Value("${towndata.dir}")
	private String townDataDir;

	private Map<String, Town> townsByIstat;
	private Map<Integer, Town> townsByIndex;

	private static final Logger logger = LoggerFactory.getLogger(TownsData.class);
	
	@PostConstruct
	public void init() throws Exception {
		townsByIstat = Maps.newTreeMap();
		townsByIndex = Maps.newTreeMap();

		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(MapperFeature.USE_ANNOTATIONS, false);
		List<?> ts = mapper.readValue(Resources.toByteArray(Resources.getResource(townDataDir + "/towns.txt")), List.class);

		for (Object t : ts) {
			Town town = mapper.convertValue(t, Town.class);
			townsByIstat.put(padIstat(town.getIstat()), town);
			townsByIndex.put(town.getIndex(), town);
		}

		int size = townsByIstat.size();
		townsByIndex.values().forEach(x -> {
			x.setCarTimes(new Integer[size]);
			x.setTransitTimes(new Integer[size]);
			x.setCarDistances(new Integer[size]);
			x.setTransitDistances(new Integer[size]);
			x.setCarPolylines(new String[size]);
			x.setTransitPolylines(new String[size]);
		});

		final Map<Integer, String> p1 = buildMap(Resources.asCharSource(Resources.getResource(townDataDir + "/car_times.txt"), Charsets.UTF_8).readLines());
		townsByIndex.entrySet().forEach(x -> {
			String ds[] = p1.get(x.getKey()).split(",");
			for (int i = 0; i < ds.length; i++) {
				try {
					x.getValue().getCarTimes()[i] = Integer.parseInt(ds[i]);
				} catch (NumberFormatException e) {
					x.getValue().getCarTimes()[i] = 0;
				}
			}
		});

		final Map<Integer, String> p2 = buildMap(Resources.asCharSource(Resources.getResource(townDataDir + "/transit_times.txt"), Charsets.UTF_8).readLines());
		townsByIndex.entrySet().forEach(x -> {
			String ds[] = p2.get(x.getKey()).split(",");
			for (int i = 0; i < ds.length; i++) {
				try {
					x.getValue().getTransitTimes()[i] = Integer.parseInt(ds[i]);
				} catch (NumberFormatException e) {
					x.getValue().getTransitTimes()[i] = 0;
				}
			}
		});

		try {
		final Map<Integer, String> p3 = buildMap(Resources.asCharSource(Resources.getResource(townDataDir + "/car_polylines.txt"), Charsets.UTF_8).readLines());
		townsByIndex.entrySet().forEach(x -> {
			String ds[] = new String[size];
			Splitter.on(",").splitToList(p3.get(x.getKey())).toArray(ds);
			x.getValue().setCarPolylines(ds);
		});
		} catch (Exception e) {
			logger.error("Error reading car polylines");
		}

		try {
		final Map<Integer, String> p4 = buildMap(Resources.asCharSource(Resources.getResource(townDataDir + "/transit_polylines.txt"), Charsets.UTF_8).readLines());
		townsByIndex.entrySet().forEach(x -> {
			String ds[] = new String[size];
			Splitter.on(",").splitToList(p4.get(x.getKey())).toArray(ds);
			x.getValue().setTransitPolylines(ds);
		});
		} catch (Exception e) {
			logger.error("Error reading transit polylines");
		}		

		final Map<Integer, String> p5 = buildMap(Resources.asCharSource(Resources.getResource(townDataDir + "/car_distances.txt"), Charsets.UTF_8).readLines());
		townsByIndex.entrySet().forEach(x -> {
			String ds[] = p5.get(x.getKey()).split(",");
			for (int i = 0; i < ds.length; i++) {
				try {
					x.getValue().getCarDistances()[i] = Integer.parseInt(ds[i]);
				} catch (NumberFormatException e) {
					x.getValue().getCarDistances()[i] = 0;
				}
			}
		});

		final Map<Integer, String> p6 = buildMap(Resources.asCharSource(Resources.getResource(townDataDir + "/transit_distances.txt"), Charsets.UTF_8).readLines());
		townsByIndex.entrySet().forEach(x -> {
			String ds[] = p6.get(x.getKey()).split(",");
			for (int i = 0; i < ds.length; i++) {
				try {
					x.getValue().getTransitDistances()[i] = Integer.parseInt(ds[i]);
				} catch (NumberFormatException e) {
					x.getValue().getTransitDistances()[i] = 0;
				}
			}
		});
		//

		townsByIndex.entrySet().forEach(x -> {
			for (int i = 0; i < size; i++) {
				String pl = x.getValue().getCarPolylines()[i];
				if (pl != null && pl.isEmpty()) {
					String pl2 = townsByIndex.get(i).getCarPolylines()[x.getValue().getIndex()];
					x.getValue().getCarPolylines()[i] = pl2;
				}
			}
		});

		townsByIndex.values().forEach(x -> {
			int index = x.getIndex();
			x.getCarDistances()[index] = 0;
			x.getCarTimes()[index] = 0;
			x.getTransitDistances()[index] = 0;
			x.getTransitTimes()[index] = 0;
		});
	}

	private Map<Integer, String> buildMap(List<String> list) {
		Map<Integer, String> map = Maps.newTreeMap();
		for (int i = 0; i < list.size(); i++) {
			map.put(i, list.get(i));
		}
		return map;
	}

	public Map<String, Town> getTownsByIstat() {
		return townsByIstat;
	}

	private Town findNearestTown(Town t1, List<Town> tos, SeparationType filter) {
		Set<Integer> indexes = tos.stream().map(x -> new Integer(x.getIndex())).collect(Collectors.toSet());

		int minIndex = -1;
		int min = Integer.MAX_VALUE;
		Integer separations[] = null;
		switch (filter) {
		case CAR_DISTANCE:
			separations = t1.getCarDistances();
			break;
		case CAR_TIME:
			separations = t1.getCarTimes();
			break;
		case TRANSIT_DISTANCE:
			separations = t1.getTransitDistances();
			break;
		case TRANSIT_TIME:
			separations = t1.getTransitTimes();
			break;
		}

		for (int i = 0; i < separations.length; i++) {
			if (separations[i] != null && separations[i] <= min && indexes.contains(i)) {
				minIndex = i;
				min = t1.getCarTimes()[i];
			}
		}

		if (minIndex >= 0) {
			return townsByIndex.get(minIndex);
		} else {
			return null;
		}
	}

	public Map<String, DistrictDistance> fillDistrictMap(List<TeachingUnit> tu, SeparationType filter) {
		Map<String, DistrictDistance> districtMap = Maps.newTreeMap();
		List<Town> tuTowns = Lists.newArrayList();
		tu.stream().map(x -> townsByIstat.get(x.getCodiceIstat())).filter(x -> x != null).forEach(tuTowns::add);
		townsByIstat.values().forEach(x -> {
			Town nearest = findNearestTown(x, tuTowns, filter);
			if (nearest != null) {
				int index = nearest.getIndex();
				DistrictDistance dd = new DistrictDistance();
				dd.setCodiceIstat(padIstat(x.getIstat()));
				dd.setCarDistance(x.getCarDistances()[index].doubleValue());
				dd.setCarTime(x.getCarTimes()[index].doubleValue());
				dd.setTransitDistance(x.getTransitDistances()[index].doubleValue());
				dd.setTransitTime(x.getTransitTimes()[index].doubleValue());
				districtMap.put(padIstat(x.getIstat()), dd);
			}
		});

		return districtMap;
	}
	
	public static String padIstat(String istat) {
		return ISTAT_PREFIX + String.format("%03d", Integer.parseInt(istat));
	}

}
