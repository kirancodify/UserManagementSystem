sap.ui.controller("scripts.index",{
	/**
     * Function to export all users to an excel file
     */
    csvAll: function() {
        window.location.href = "../../xs/csv.xsjs?cmd=exportExcel&mode=view"
    },
    /**
     * Function to export all users with language = DE to and excel file
     */
    csvDE: function() {
        window.location.href = "../../xs/csv.xsjs?cmd=exportExcel&mode=view&language=DE"
    },
    /**
     * Function to export all users with language = EN to and excel file
     */
    csvEN: function() {
        window.location.href = "../../xs/csv.xsjs?cmd=exportExcel&mode=view&language=EN"
    }
});