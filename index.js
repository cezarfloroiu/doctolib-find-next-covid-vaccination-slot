const request = require("request");
const moment = require("moment");

async function getVaccinationCenters(url) {
    var options = {
        url: url,
        encoding: null,
        headers: { 'Content-Type': 'application/json' }

    };

    return new Promise( (resolve, reject) => {
        request.get(options, function(err, resp, body) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(body);
            }
        })
    });

}

async function getDoctorInfo(doctorId) {
    /*
    Ref_visit_motive_ids from:   https://api.doctolib.fr/covid_vaccines/
    Response:  [{"id":37,"name":"astrazeneca","first_shot_ref_visit_motive_id":7107,"second_shot_ref_visit_motive_id":7108},{"id":2,"name":"moderna","first_shot_ref_visit_motive_id":7005,"second_shot_ref_visit_motive_id":7004},{"id":1,"name":"pfizer","first_shot_ref_visit_motive_id":6970,"second_shot_ref_visit_motive_id":6971}]
    */

    var options = {
        url: `https://www.doctolib.fr/search_results/${doctorId}.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005&speciality_id=5494&search_result_format=json&limit=3`,
        encoding: null,
        headers: { 'Content-Type': 'application/json' }

    };

    return new Promise( (resolve, reject) => {
        request.get(options, function(err, resp, body) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(body);
            }
        })
    });

}


function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Main function

(async () => {


    /* hard coded searches - replace with your own preference (cityname.json)*/
    const vaccinationPlaces = [
    'https://www.doctolib.fr/vaccination-covid-19/94130-nogent-sur-marne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005',
    'https://www.doctolib.fr/vaccination-covid-19/94130-nogent-sur-marne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005&page=2',
    'https://www.doctolib.fr/vaccination-covid-19/94130-nogent-sur-marne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005&page=3',
    'https://www.doctolib.fr/vaccination-covid-19/94130-nogent-sur-marne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005&page=4',
    'https://www.doctolib.fr/vaccination-covid-19/94130-nogent-sur-marne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005&page=5',
    'https://www.doctolib.fr/vaccination-covid-19/94130-nogent-sur-marne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005&page=6',
    'https://www.doctolib.fr/vaccination-covid-19/94130-nogent-sur-marne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005&page=7',
    'https://www.doctolib.fr/vaccination-covid-19/94130-nogent-sur-marne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005&page=8',
    'https://www.doctolib.fr/vaccination-covid-19/94130-nogent-sur-marne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005&page=9',
    'https://www.doctolib.fr/vaccination-covid-19/94130-nogent-sur-marne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005&page=10',
    'https://www.doctolib.fr/vaccination-covid-19/le-perreux-sur-marne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005', 
    'https://www.doctolib.fr/vaccination-covid-19/neuilly-sur-marne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005',
    'https://www.doctolib.fr/vaccination-covid-19/saint-mande.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005',
    'https://www.doctolib.fr/vaccination-covid-19/saint-maur-des-fosses.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005',
    'https://www.doctolib.fr/vaccination-covid-19/rosny-sous-bois.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005',
    /*'https://www.doctolib.fr/vaccination-covid-19/meaux.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005%27',
    'https://www.doctolib.fr/vaccination-covid-19/melun.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005%27', 
    'https://www.doctolib.fr/vaccination-covid-19/compiegne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005%27',
    'https://www.doctolib.fr/vaccination-covid-19/beauvais.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005%27',
    'https://www.doctolib.fr/vaccination-covid-19/beauvais.json?ref_visit_motive_ids[]=6970&ref_visit_motive_ids[]=7005&page=2',
    'https://www.doctolib.fr/vaccination-covid-19/sezanne.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005'*/

]

    for (const page of vaccinationPlaces) {

        const res = await getVaccinationCenters(page);        
        const json = JSON.parse(res);

        //console.log (json.data.doctors);

        for (const doctor of json.data.doctors){
            //await Sleep(1000); // throttle - 1 sec between api calls         

            // look for availabilities for each doctor / center
            const avail = await getDoctorInfo(doctor.id);
            
            const availDetails = JSON.parse(avail);
            //console.log(availDetails)
            if (availDetails.total > 0) {
                
                // get the available slots and make them readable by humans
                for (const availability of availDetails.availabilities) {
                    if (availability.slots.length > 0 ) {
                        let slots = '';
                        for (const slot of availability.slots)
                        {
                            slots += '[' + moment(slot.start_date).format("hh:mm") + '-' + moment(slot.end_date).format("hh:mm") + ']';
                        }

                        console.log ('Found ' + availability.slots.length + ' slots {' + slots + '} on ' + availability.date + ' at ' + doctor.name_with_title + ', ' + doctor.address + ', ' + doctor.city + ' ' + doctor.zipcode);
                        console.log('\r\n\r\n');
                    }
                }
            
            }
            /*
            if (availDetails.next_slot) {
                console.log ('Found next availability on ' + availDetails.next_slot + ' at ' + doctor.name_with_title + ', ' + doctor.address + ', ' + doctor.city + ' ' + doctor.zipcode);
            }*/
        }
        
    }

})();
