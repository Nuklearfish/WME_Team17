<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
            <table class="Tabelle" id="table_1">

<!--EIGENES-->
            <thead>
                <tr>
                    <th>ID</th>
                    <th>
                        Country
                        <button class="sortierbutton" onclick="sort('table_1', 1, 1)"><i class="fa fa-angle-up"></i></button>
                        <button class="sortierbutton" onclick="sort('table_1', 1, 0)"><i class="fa fa-angle-down"></i></button>
                    </th>
                    <th>birth rate</th>
                    <th>cellphones</th>
                    <th>children / woman</th>
                    <th>electric usage</th>
                    <th>internet usage</th>
                </tr>
            </thead>   
                
            <tbody>	
			<xsl:for-each select="Countries/Country">
				<tr>
					<td><xsl:value-of select="id"/></td>
					<td><xsl:value-of select="name"/></td>
					<td><xsl:value-of select="birth"/></td>
					<td><xsl:value-of select="cell"/></td>
					<td><xsl:value-of select="children"/></td>
					<td><xsl:value-of select="electricity"/></td>
					<td><xsl:value-of select="internet"/></td>			
				</tr>
			</xsl:for-each>
            </tbody>
         </table>		
	</xsl:template>
</xsl:stylesheet>