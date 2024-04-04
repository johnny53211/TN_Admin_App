let dataTable = {
    Table: {},
    TblData: [],
    categoryTable: (args = {}) => {
        let { selector, columns } = args;
        $(`#${selector} thead tr`).addClass("filters");
        let searchValue;
        function getSearchValue(value) {
            searchValue = value; // Update the searchValue variable with the new value
        }
        let ajaxData = {
            type: "post",
            url: apiUrl['getEmpDetails'],
            // datatype: JSON,
            data: function (d) {
                d.limit = d.length;
                d.offset = d.start;
                d.count = true;
                d.search.value = searchValue || d.search.value;
                console.log(d.search.value);
                return d;
            },
            dataFilter: function (data) {
                let json = jQuery.parseJSON(data);
                console.log(json);
                json.recordsTotal = json.data.total_record;
                json.recordsFiltered = json.data.total_record;
                json.data = json.data.data || json.data || '';
                this.TblData = json.data.data || json.data || '';
                return JSON.stringify(json);
            },
        };
        dataTable.Table = $('#dataTable_admin').DataTable({
            paging: true,
            pageLength: 10,
            serverSide: true,
            ajax: ajaxData,
            columns: [
                { data: 'emp_code' },
                { data: 'mail_id' },
                { data: 'gender' }
            ],
            initComplete: function () {
                let api = this.api();
                let table = $('#dataTable_admin'); // Use selector to find the table element

                // Check for filters row existence and create it if necessary
                let filtersRow = table.find("thead tr.filters");
                if (filtersRow.length === 0) {
                    filtersRow = table.find("thead tr").clone(true).addClass("filters").appendTo(table.find("thead"));
                }
                $('.data-table-pagination a').on('click', function (e) {
                    e.preventDefault();
                    // Extract the desired page number from the clicked element
                    let pageNumber = $(this).data('page-number');
                    // Update the ajax data to include the new page number
                    dataTable.Table.ajax.data({
                        page: pageNumber - 1 // Adjust for zero-based indexing
                    }).load(); // Reload the table data
                });

                // Apply filters to each filterable column (excluding the last column)
                filtersRow.find("th:not(:last-child)").each(function (colIdx) {
                    let title = $(this).text();
                    let input = $(this).find("input");

                    input.addClass("filter-input")
                        .off("keyup change") // Remove any previous event handlers
                        .on("input", function (e) {
                            let searchValue = $(this).val();
                            getSearchValue(searchValue);
                            api.column(colIdx).search(searchValue).draw();
                        })
                        .attr("value", "") // Clear initial value
                        .trigger("input") // Trigger initial input event
                        .focus(); // Set focus to the input field
                });

                let pageInfo = api.page.info();
                $('.data-table-pagination-label').text(
                    (pageInfo.page + 1) + '-' + (pageInfo.end + 1) + ' of ' + pageInfo.recordsTotal
                );
                // Handle dropdown filter (if applicable)
                let dropdownFilter = filtersRow.find(".input-with-value");
                console.log(dropdownFilter.length);
                if (dropdownFilter.length) {
                    dropdownFilter.on("change", function (e) {
                        e.preventDefault();
                        let selectedValue = $(this).val();
                        console.log(selectedValue);
                        getSearchValue(selectedValue);
                        let colIdx = $(this).data('col-index');
                        console.log(colIdx);
                        api.column(colIdx).search(selectedValue).draw();
                    });
                }
            },

        });

        console.log(ajaxData);
    },
}