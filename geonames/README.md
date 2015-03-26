<html><body>
<h3>DataPower Geonames.org reverse geocoding</h3>

This is a small example of using <a target="_blank" href="http://www-03.ibm.com/software/products/en/datapower-gateway">IBM DataPower Gateway</a> GatewayScript (JavaScript) to perform place lookup from geopisition
(latitude / longitude in decimal degrees), using <a target="_blank" href="http://geonames.org">Geonames.org</a> JSON API.


<h4>Installation</h4>

The file <strong>Geonames_DataPower_Domain_export.zip </strong> is a DataPower domain export of a Multi-Protocol Gateway
which uses the GatewayScript (geonames.js) to perform the place lookup based on received geoposition.

This can be imported into a DataPower domain.

Or you can add the geonames.js as a GatewayScript action to desired processing rule(s).

<h4>Testing</h4>

For easy testing of the JavaScript on DataPower, I use the
<a target="_blank" href="https://www.ibm.com/developerworks/community/forums/html/topic?id=77777777-0000-0000-0000-000014590913">coproc2</a> tool by Hermann Stamm-Wilbrandt. With coproc2 one can send a GatewayScript / JavaScript (and XSLT etc.) to the
coproc2 DataPower service for execution.

<h4>Use</h4>

The file geonames_lookup_url.txt  contains a couple of sample links I have used / are using for testing the service.

The DataPower Geonames service can be, for the time being, be testet
<a target="_blank" href="http://194.19.99.197:8092?latitude=59.927&longitude=10.733&username=demo">here</a>

Please note that you need a valid username at Geonames.org to use their API. The "demo" user has limits of number of requests per day or hour.

</body></html>
