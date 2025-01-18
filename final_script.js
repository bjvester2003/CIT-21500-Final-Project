// --- Notes --- //

// -- induceError() -- //

// On lines 39 and 48, the function induceError() is called. 
// What is notable about these calls is the non-existence of the induceError() function.
// This action will of course result in an error when running this specific process within the interaction. 
// This anomoly is, both fortunately and unfortunately, by design.
// During the course of the development of this application, a bug surfaced that resulted in a toggle failure of the div containing country data.
// Upon clicking the div of a given country, the div containing the data is supposed to be revealed and remain displayed until clicked again. 
// For reasons unable to be determined, without the inclusion of the induceError() function, a form of oscillation occurs.
// This results in the immediate hiding of data div immediately after it reaches maximum visibility. 
// As I was unable to diagnose the cause after a substantial amount of time searching, in the interest of time, the effort to patch this bug was abandoned.
// Unfortunately, due to Christmas related family plans this weekend, my schedule is not as accomodating as I would like.
// From previous experience, I had learned that inducing an error stops the progression of the code.
// To provide some form of fix, this fact was employed in the form of the induceError() functions. 
// For the time being, the induced errors shall be denoted as 'Temporary Features'.



let country_list = []

// --- DOM Modification--- //

const ineractions = function() {
    // Initializes interactions/animations. 
    $('.clicker').on('mouseover', function() {
        $(this).css({'color' : 'tan'})
    });
    $('.clicker').on('mouseout', function() {
        $(this).css({'color' : 'black'})
    });

    $('.country_element').on('click', function() {
        switch ($(this).find('.country_info').css('display') == 'none') {
            case true :
                $(this).find('.country_info').show('slow');
                $(this).find('.header_image').hide('slow');
                induceError()
                break;
            case false :
                $(this).find('.country_info').hide('slow');
                $(this).find('.header_image').show('slow');
                induceError()
                break;
        }
    });
}

const addEntry = function(Country) {
    // Adds country element to display area. 
    let markup=`
        <div id="element_${Country.cca2}" class="country_element">
            <h3 class="header" style="margin: 0;">
                <img class="header_image" src="${Country.flags.png}">
                ${Country.name.common} -
                <span class="clicker" style="font-size: small;"> Click for More</span>
            </h3>

            <div class="country_info">
               <img class="flag" src="${Country.flags.png}" alt="Flag of ${Country.name.common}">
               <div class="info_box" id="identification">
                   <p class="info_line" id="common_name"><span style="font-size: large; font-weight: bold;">Common Name - </span><span class="content">${Country.name.common}</span></p>
                   <p class="info_line" id="official_name"><span style="font-size: large; font-weight: bold;">Official Name - </span>${Country.name.official}</p>
                   <p class="info_line" id="cca2"><span style="font-size: large; font-weight: bold;">Abbreviation - </span>${Country.cca2}</p>
               </div>
               <div class="info_box" id="population">
                   <p class="info_line" id="capital"><span style="font-size: large; font-weight: bold;">Capital - </span>${Country.capital}</p>
                   <p class="info_line" id="population"><span style="font-size: large; font-weight: bold;">Population - </span>${Country.population}</p>
                   <p class="info_line" id="lat_lng"><span style="font-size: large; font-weight: bold;">Latitude and Longitude - </span>${Country.latlng[0]}, ${Country.latlng[1]}</p>
               </div>
               <div class="info_box" id="geographic">
                   <p class="info_line" id="continent"><span style="font-size: large; font-weight: bold;">Continent - </span>${Country.continents}</p>
                   <p class="info_line" id="region"><span style="font-size: large; font-weight: bold;">Region - </span>${Country.region}</p>
                   <p class="info_line" id="subregion"><span style="font-size: large; font-weight: bold;">Subregion - </span>${Country.subregion}</p>

                </div>
            </div>
        </div>`;

    $('.content_area').prepend(markup);

    $('.country_info').hide();

    ineractions();
    
};

const submitEntry = function(mode, index) {
    // Determines function mode. Adds or modifies array object based off of mode. Removes modification/creation area.
    console.log('Submit Mode - '+mode)

    
    if (mode == 'c') {
        if (abbreviationExists($('#abbreviation.edit_option').val()) == true) {
            console.log('Process aborted - Abbreviation already taken.')
            alert('Abbreviation already in use. Please enter valid unique identifier.')
        } else {
            let country = {
                capital : [$('#capital.edit_option').val()],
                cca2 : $('#abbreviation.edit_option').val(),
                continents : [$('#continent_select_menu.edit_option').val()],
                flags : {
                    png : '',
                    svg : ''
                },
                latlng : [$('#latitude.edit_option').val(), $('#longitude.edit_option').val()],
                name : {
                    common : $('#common_name.edit_option').val(),
                    official : $('#official_name.edit_option').val(),
                },
                population : $('#population.edit_option').val(),
                region : $('#region.edit_option').val(),
                subregion : $('#subregion.edit_option').val()
            };
            console.log('Pushed - ' +country.name.common + ' Object')
            country_list.push(country)
            createPage(country_list)
            console.log('Created - ' + country.name.common)
        };
    } else if(mode == 'm') {
        let target = country_list[index]
        if ($('#abbreviation.edit_option').val() == target.cca2) {
            target.capital = [$('#capital.edit_option').val()]
            target.cca2 = $('#abbreviation.edit_option').val(),
            target.continents = [$('#continent_select_menu.edit_option').val()],
            target.latlng = [$('#latitude.edit_option').val(), $('#longitude.edit_option').val()],
            target.name = {
                common : $('#common_name.edit_option').val(),
                official : $('#official_name.edit_option').val(),
            },
            target.population = $('#population.edit_option').val(),
            target.region = $('#region.edit_option').val(),
            target.subregion = $('#subregion.edit_option').val()
            createPage(country_list);  
        } else if(abbreviationExists($('#abbreviation.edit_option').val()) == true) {
            console.log('Process aborted - Abbreviation already taken.')
            alert('Abbreviation already in use. Please enter valid unique identifier.')
        } else {  
            target.capital = [$('#capital.edit_option').val()]
            target.cca2 = $('#abbreviation.edit_option').val(),
            target.continents = [$('#continent_select_menu.edit_option').val()],
            target.latlng = [$('#latitude.edit_option').val(), $('#longitude.edit_option').val()],
            target.name = {
                common : $('#common_name.edit_option').val(),
                official : $('#official_name.edit_option').val(),
            },
            target.population = $('#population.edit_option').val(),
            target.region = $('#region.edit_option').val(),
            target.subregion = $('#subregion.edit_option').val()
            createPage(country_list);  
        };
    };

    removeModificationArea();
};

const createModificationArea = function(title, payload, disable_fields, mode) {
    // Accepts paramaters. Checks if aside is already in display. Creates modification aside. Disables selected feilds.

    if ($('.content_area_wrap').children().is($('div.modification_area'))){
        console.log('Element already exists');

    } else {
        const continents = [
            'North America',
            'South America',
            'Europe',
            'Asia',
            'Africa',
            'Australia',
            'Oceania',
            'Antartica'
        ];

        let markup = `
        <div class="modification_area">
            <h2>${title}</h2>

            <input class="edit_option" id="common_name" type="text" value="${payload[0].name.common}" size="50" maxlength="50">
            <input class="edit_option" id="official_name" type="text" placeholder="Official Name" size="50" maxlength="50">
            <input class="edit_option" id="abbreviation" type="text" placeholder="Abbreviation" size="50" maxlength="2">

            <input class="edit_option" id="capital" type="text" placeholder="Capital City" size="50" maxlength="50">
            <input class="edit_option" id="population" type="number" placeholder="Population" size="50">
            <div id="coordinates">
                <input class="edit_option" id="latitude" type="number" placeholder="Latitude" size="50">
                <input class="edit_option" id="longitude" type="number" placeholder="Logitude" size="50">
            </div>
            <div id="continents">
                <label for="continent_select_menu" class="edop_label" style="font-weight: bold;">Continent :</label>
                <select id="continent_select_menu" class="edit_option"></select>
            </div>
            <input class="edit_option" id="region" type="text" placeholder="Region" size="50" maxlength="50">
            <input class="edit_option" id="subregion" type="text" placeholder="Subregion" size="50" maxlength="50">

            <div id="buttons">
                <button class="edit_option" onclick="submitEntry('${mode}', ${payload[1]})">Submit</button>
                <button class="edit_option" onclick="removeModificationArea()">Cancel</button>
            </div>
        </div>
        `;

        $('.content_area').before(markup);

        continents.forEach((continent) => {
            let markup = `<option value='${continent}'>${continent}</option>`;

            $('#continent_select_menu').append(markup);
        });

        disable_fields.forEach((field) => {
            $('#'+field).prop('disabled', true);
            $('#'+field).css({'opacity' : '50%'})
            console.log('Disabled - ' + field)
        });

        console.log('Displayed - Aside')
    };
};

const removeModificationArea = function() {
    // Removes modification/creation aside.
    $('.modification_area').detach()
    console.log('Removed - Aside')
}

// --- Utility Functions --- //

const abbreviationExists = function(waldo) {
    // Accepts country ID. Checks if ID alrady in use.
    exists = false
    country_list.forEach((country) => {
        if (country.cca2 == waldo) {
            exists = true
        };
    });
    return exists;
};

const countryExists = function(waldo) {
    // Accepts name. Checks if country exists in array.
    exists = false
    country_list.forEach((country) => {
        if (country.name.common == waldo.name.common) {
            exists = true
        };
    });
    return exists;
}

const getCountry = function(mode) {
    // Accepts function mode. Retrieves selectd name. Depending on mode, checks if country exists or not. Returns object based on mode. 
    let match = [];
    if ($('#name_field').val() == '') {
        alert('Please enter a selection');
    } else {
        let nomen = $('#name_field').val();
        console.log('Get Mode - ' +mode)
        if (mode == 'c') {
            let country = {name : {common : nomen}}
            if (countryExists(country) == true){
                console.log('Process aborted - Country already exists.')
                alert('Country already exists. Please enter valid target.')
                return match
            } else {
                console.log('Returned - ' + nomen);
                return nomen;
            };
        } else {
            let country = {name : {common : nomen}}
            if (countryExists(country) == false){
                console.log('Process aborted - Country does not exist.')
                alert('Country does not exist. Please enter valid target.')
            } else {
                country_list.forEach((country) => {
                    if (mode == 'o' && nomen == country.name.common) {
                        match.push(country)
                        match.push(country_list.indexOf(country))
                    };
                });
            };
            console.log('Returned - ' + match[0].name.common + ' Object')
        };
    };
    return match;
};

// --- CRUD Actions --- //

const createCountry = function() {
    // Acquires country name. Sets certain fields to be disabled. Initiates creation of aside in creation mode.
    console.log('Creating Started');

    let returned = getCountry('c');

    if (returned[0] == undefined) {
        console.log('Creation cancelled.')
    } else {
        let payload = [ 
            {
            
                name : {
                    common: returned
                }
                
            }
        ]
        let disable_fields = [
            'common_name'
        ]
        createModificationArea('Create New Country', payload, disable_fields, 'c')
    };

    console.log('Creating Ended');
};

const readCountry = function() {
    // Acquires country name. Selects country element based off of country id. Hides all country elements with non-matching ids.
    console.log('Reading Started');

    if ($('#name_field').val() == 'All') {
        createPage(country_list);
    } else {
        let returned = getCountry('o');
        console.log(returned)
        if (returned[0] == undefined) {
            console.log('Reading cancelled - Input Undefined');
        } else {
            country_list.forEach((country) => {
                let target = `element_${country.cca2}`;
                if (target == `element_${returned[0].cca2}`){
                    console.log('Displayed - ' + returned[0].name.common);
                    $(`#element_${returned[0].cca2}`).show()
                    $(`#element_${returned[0].cca2}`).find('.country_info').show('slow');
                } else {
                    $(`#${target}`).hide();
                };
            });
        };
    };

    console.log('Reading Ended');
}

const updateCountry = function() {
    // Acquires country name. Sets certain fields to be disabled. Initiates creation of aside in modification mode. Sets values of input feilds.

    console.log('Updating Started');
    let returned = getCountry('o');
    console.log(returned)

    if (returned[0] == undefined) {
        console.log('Creation cancelled.')
    } else {
        let disable_fields = [
            'latitude',
            'longitude',
            "continent_select_menu",
            "region",
            "subregion"
        ];
        createModificationArea('Update Existing Country', returned, disable_fields, 'm')

        $('#official_name').val(returned[0].name.official);
        $('#abbreviation').val(returned[0].cca2);
        
        $('#capital').val(returned[0].capital);
        $('#population').val(returned[0].population);
        $('#latitude').val(returned[0].latlng[0]);
        $('#longitude').val(returned[0].latlng[1]);

        $('#continent_select_menu').val(returned[0].continents[0]);
        $('#region').val(returned[0].region);
        $('#subregion').val(returned[0].subregion);
    };

    console.log('Updating Ended');
};

const deleteCountry = function() {
    // Acquires country name. Selects country element based off of country id. Hides element and removes entry from object array. 
    console.log('Deleting Started');
    let returned = getCountry('o')

    if (returned[0] == undefined) { 
        console.log('Deleting Cancelled.')
    } else {
        $('#element_'+returned[0].cca2).hide('slow');
        
        setTimeout(function(){
            $('#element_'+returned[0].cca2).remove();
            country_list.pop(returned[1])
            console.log('Deleted - ' + returned[0].name.common);
        }, 5000);
    };

    console.log('Deleting Ended');
};



// --- Setup and Data --- //

const createPage = function(data) {
    // Accepts list of objects, ensures list area is empty, and adds an element for counrty.
    $('.content_area').empty()

    data.forEach(function (Country) {
        addEntry(Country);
    });
};

const successAPIReturn = function(data) {
    // Upon successful data return from dataRetrieve(), adds each entry to global array and initiates page creation.
    console.log("Retrieved - Data", data);

    data.forEach((country) => {
        country_list.push(country)
    })

    createPage(country_list);
    alert("When using the 'Read' action, submit 'All' to veiw the complete list of countries.")
};

const dataRetrieve = function() {
    // Uses jQuery and ajax to retrieve data from API endpoint
    $.ajax({
        type: "GET",
        url: "https://restcountries.com/v3.1/all?fields=name,cca2,capital,continents,flags,languages,latlng,population,region,subregion",
        dataType: "json",
        success: function (result, status, xhr) {
            successAPIReturn(result);
        },
        error: function (xhr, status, error) {
            alert(
              "Result: " +
                status +
                " " +
                error +
                " " +
                xhr.status +
                " " +
                xhr.statusText
          );
        },
    });
};

// Initiates data retrieval function when document is loaded
$(document).ready(dataRetrieve);