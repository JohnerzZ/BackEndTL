import click, requests, json, csv, os
from datetime import datetime
from click_option_group import optgroup, RequiredMutuallyExclusiveOptionGroup

baseURL = 'http://localhost:8765/energy/api'
tokenPATH = './'
tokenNAME = 'softeng19bAPI.token'

class Date(click.ParamType):
    name = 'date'

    def __init__(self, formats=None):
        self.formats = formats or [
            '%Y-%m-%d',
            '%Y-%m',
            '%Y'
        ]

    def get_metavar(self, param):
        return '[{}]'.format('|'.join(self.formats))

    def _try_to_convert_date(self, value, format):
        try:
            return datetime.strptime(value, format).date()
        except ValueError:
            return None

    def convert(self, value, param, ctx):
        for format in self.formats:
            date = self._try_to_convert_date(value, format)
            if date:
                return date

        self.fail(
            'invalid date format: {}. (choose from {})'.format(
                value, ', '.join(self.formats)))

    def __repr__(self):
        return 'Date'

@click.group()
def energy_group56():
    pass

@energy_group56.command()
@click.option('--username', required=True, type = str)
@click.option('--passw', required=True, type = str)
def login(username, passw):
    """Basic command log into the command line interface."""
    url = baseURL + '/Login'
    data = {
        'username' : username,
        'password' : passw
    }
    p = requests.post(url, data = data)
    
    if(p.status_code == 200):
        click.echo(f'Υou have logged in successfully.')
        x = p.json()
        click.echo(str(x['token']))
        with open(tokenPATH + tokenNAME, 'w') as outfile:
            outfile.write(str(x['token']))
            outfile.close()
    else:
        click.echo(f'Log in error.')


@energy_group56.command()
def logout():
    """Basic logout command. Once called, the respective token string will be deleted from the client's memory. No options needed."""
    url = baseURL + '/Logout'
    with open(tokenPATH + tokenNAME ,'rb') as infile:
        token = infile.read()
        infile.close()
    head = {'X-OBSERVATORY-AUTH': token}
    p = requests.post(url, headers = head)
    
    if(p.status_code == 200):
        if os.path.exists(tokenPATH + tokenNAME):
            os.remove(tokenNAME)
            click.echo("You have logged out successfully.")
    else:
        click.echo("Error logging out.")

@energy_group56.command()
@click.option('--area', required=True, type = str)
@click.option('--timeres', required=True, type=click.Choice(['PT15M', 'PT30M','PT60M'], case_sensitive=True))
@click.option('--fileformat', type=click.Choice(['csv', 'json'], case_sensitive=True))
@optgroup.group(cls=RequiredMutuallyExclusiveOptionGroup)
@optgroup.option('--date', type=Date(formats=['%Y-%m-%d']))
@optgroup.option('--month', type=Date(formats=['%Y-%m']))
@optgroup.option('--year', type=Date(formats=['%Y']))
def ActualTotalLoad(area, timeres, fileformat, date, month, year):
    """Returns the requested data from the ActualTotalLoad table."""
    url = baseURL + '/ActualTotalLoad/' + area + '/' + timeres
    if(date != None):
        Day = str(date)[8:]
        Month = str(date)[5:7]
        Year = str(date)[:4]
        url = url + '/date/' + Year + '-' + Month + '-' + Day
    if(month != None):
        Month = str(month)[5:7]
        Year = str(month)[:4]
        url = url + '/month/' + Year + '-' + Month
    if(year != None):
        Year = str(year)[:4]
        url = url + '/year/' + Year
    if(fileformat != None):
        url = url + '&format=' + fileformat
    with open(tokenPATH + tokenNAME ,'r') as infile:
        token = infile.read()
        infile.close()
        click.echo(token)
    head = {'X-OBSERVATORY-AUTH': token}
    g = requests.get(url, headers = head)
    if(g.status_code == 402):
        click.echo(f'Error. You are out of quota.')
    elif(g.status_code == 403):
        click.echo(f'Error. There is no such data.')
    elif(g.status_code == 404):
        click.echo(f'Error. Bad request.')
    else:
        y=g.json()
        click.echo(y['result'])



    
  
@energy_group56.command()
@click.option('--area', required=True, type = str)
@click.option('--timeres', required=True, type=click.Choice(['PT15M', 'PT30M','PT60M'], case_sensitive=True))
@click.option('--productiontype', required=True)
@click.option('--fileformat', type=click.Choice(['csv', 'json'], case_sensitive=True))
@optgroup.group(cls=RequiredMutuallyExclusiveOptionGroup)
@optgroup.option('--date', type=Date(formats=['%Y-%m-%d']))
@optgroup.option('--month', type=Date(formats=['%Y-%m']))
@optgroup.option('--year', type=Date(formats=['%Y']))
def AggregatedGenerationPerType(area, timeres, productiontype, fileformat, date, month, year):
    """Returns the requested data from the AggregatedGenerationPerType table."""
    url = baseURL + '/AggregatedGenerationPerType/' + area + '/' + productiontype + '/' + timeres
    if(date != None):
        Day = str(date)[8:]
        Month = str(date)[5:7]
        Year = str(date)[:4]
        url = url + '/date/' + Year + '-' + Month + '-' + Day
    if(month != None):
        Month = str(month)[5:7]
        Year = str(month)[:4]
        url = url + '/month/' + Year + '-' + Month
    if(year != None):
        Year = str(year)[:4]
        url = url + '/year/' + Year
    if(fileformat != None):
        url = url + '&format=' + fileformat
    g = requests.get(url)
    with open(tokenPATH + tokenNAME ,'r') as infile:
        token = infile.read()
        infile.close()
    head = {'X-OBSERVATORY-AUTH': token}
    g = requests.get(url, headers = head)
    if(g.status_code == 402):
        click.echo(f'Error. You are out of quota.')
    elif(g.status_code == 403):
        click.echo(f'Error. There is no such data.')
    elif(g.status_code == 404):
        click.echo(f'Error. Bad request.')
    else:
        click.echo(f'{g.content}')


@energy_group56.command()
@click.option('--area', required=True, type = str)
@click.option('--timeres', required=True, type=click.Choice(['PT15M', 'PT30M','PT60M'], case_sensitive=True))
@click.option('--fileformat', type=click.Choice(['csv', 'json'], case_sensitive=True))
@optgroup.group(cls=RequiredMutuallyExclusiveOptionGroup)
@optgroup.option('--date', type=Date(formats=['%Y-%m-%d']))
@optgroup.option('--month', type=Date(formats=['%Y-%m']))
@optgroup.option('--year', type=Date(formats=['%Y']))
def DayAheadTotalLoadForecast(area, timeres, fileformat, date, month, year):
    """Returns the requested data from the DayAheadTotalLoadForecast table."""    
    url = baseURL + '/DayAheadTotalLoadForecast/' + area + '/' + timeres
    if(date != None):
        Day = str(date)[8:]
        Month = str(date)[5:7]
        Year = str(date)[:4]
        url = url + '/date/' + Year + '-' + Month + '-' + Day
    if(month != None):
        Month = str(month)[5:7]
        Year = str(month)[:4]
        url = url + '/month/' + Year + '-' + Month
    if(year != None):
        Year = str(year)[:4]
        url = url + '/year/' + Year
    if(fileformat != None):
        url = url + '&format=' + fileformat
    with open(tokenPATH + tokenNAME ,'r') as infile:
        token = infile.read()
        infile.close()
    head = {'X-OBSERVATORY-AUTH': token}
    g = requests.get(url, headers = head)
    if(g.status_code == 402):
        click.echo(f'Error. You are out of quota.')
    elif(g.status_code == 403):
        click.echo(f'Error. There is no such data.')
    elif(g.status_code == 404):
        click.echo(f'Error. Bad request.')
    else:
        click.echo(f'{g.content}')

@energy_group56.command()
@click.option('--area', required=True, type = str)
@click.option('--timeres', required=True, type=click.Choice(['PT15M', 'PT30M','PT60M'], case_sensitive=True))
@click.option('--fileformat', type=click.Choice(['csv', 'json'], case_sensitive=True))
@optgroup.group(cls=RequiredMutuallyExclusiveOptionGroup)
@optgroup.option('--date', type=Date(formats=['%Y-%m-%d']))
@optgroup.option('--month', type=Date(formats=['%Y-%m']))
@optgroup.option('--year', type=Date(formats=['%Y']))
def ActualvsForecast(area, timeres, fileformat, date, month, year):
    """Returns the requested data from the ActualvsForecast table."""    
    url = baseURL + '/ActualvsForecast/' + area + '/' + timeres
    if(date != None):
        Day = str(date)[8:]
        Month = str(date)[5:7]
        Year = str(date)[:4]
        url = url + '/date/' + Year + '-' + Month + '-' + Day
    if(month != None):
        Month = str(month)[5:7]
        Year = str(month)[:4]
        url = url + '/month/' + Year + '-' + Month
    if(year != None):
        Year = str(year)[:4]
        url = url + '/year/' + Year
    if(fileformat != None):
        url = url + '&format=' + fileformat
    with open(tokenPATH + tokenNAME ,'r') as infile:
        token = infile.read()
        infile.close()
    head = {'X-OBSERVATORY-AUTH': token}
    g = requests.get(url, headers = head)
    if(g.status_code == 402):
        click.echo(f'Error. You are out of quota.')
    elif(g.status_code == 403):
        click.echo(f'Error. There is no such data.')
    elif(g.status_code == 404):
        click.echo(f'Error. Bad request.')
    else:
        click.echo(f'{g.content}')

@energy_group56.command()
def HealthCheck():
    """Additional command for checking the health status of the backend sub-system"""
    url = baseURL + '/HealthCheck'
    g = requests.get(url)
    if g.status_code == 'OK':
        click.echo("Health check completed successfully.")
    else:
        click.echo("Health check was unsuccessfull.")

@energy_group56.command()
def Reset():
    """Additional command for deleting every user in the database, apart from the main admin."""
    url = baseURL + '/Reset'
    g = requests.post(url)
    if g.status_code == 'OK':
        click.echo("Reset completed successfully.")
    else:
        click.echo("Reset was unsuccessfull.")

@energy_group56.command()
@click.option('--passw', type = str)
@click.option('--email', type = str)
@click.option('--quota', type = str)
@click.option('--source', type = str)
@optgroup.group(cls=RequiredMutuallyExclusiveOptionGroup)
@optgroup.option('--newuser',type = str)
@optgroup.option('--moduser',type = str)
@optgroup.option('--userstatus',type = str)
@optgroup.option('--newdata', type=click.Choice(['ActualTotalLoad', 'AggregatedGenerationPerType','DayAheadTotalLoadForecast']))
def Admin(newuser, moduser, userstatus, newdata, passw, email, quota, source):
    """This is the admin scope"""
    url = baseURL + '/Admin'
    with open(tokenPATH + tokenNAME ,'r') as infile:
        token = infile.read()
        infile.close()
    head = {'X-OBSERVATORY-AUTH': token}
    if(newuser != None):
        url = url + '/users'
        data = {
        'username' : newuser,
        'password' : passw,
        'email' : email,
        'quota' : quota
        }
        p = requests.post(url, data = data, headers = head)
        if(p.status_code == 401):
            click.echo(f'Error. Not authorized user.')
        elif(p.status_code == 402):
            click.echo(f'Error. You are out of quota.')
        elif(p.status_code == 403):
            click.echo(f'Error. There is no such data.')
        elif(p.status_code == 404):
            click.echo(f'Error. Bad request.')
        else:
            click.echo(f"User {newuser} was created successfully.")
    if(moduser != None):
        url = url + '/users/' + moduser
        data = {
        'username' : moduser,
        'password' : passw,
        'email' : email,
        'quota' : quota
        }
        p = requests.put(url, data = data, headers = head)
        if(p.status_code == 401):
            click.echo(f'Error. Not authorized user.')
        elif(p.status_code == 402):
            click.echo(f'Error. You are out of quota.')
        elif(p.status_code == 403):
            click.echo(f'Error. There is no such data.')
        elif(p.status_code == 404):
            click.echo(f'Error. Bad request.')
        else:
            click.echo("Successfully modified user data.")
    if(userstatus != None):
        url = url + '/users/' + userstatus
        g = requests.get(url, headers = head)
        if(g.status_code == 401):
            click.echo(f'Error. Not authorized user.')
        elif(g.status_code == 402):
            click.echo(f'Error. You are out of quota.')
        elif(g.status_code == 403):
            click.echo(f'Error. There is no such data.')
        elif(g.status_code == 404):
            click.echo(f'Error. Bad request.')
        else:
            click.echo(f'{g.content}')
    if(newdata != None):
        url = url + newdata
        files = {'file': open(tokenPATH + source, 'rb')}
        p = requests.post(url, files = files, headers = head)
        if(p.status_code == 401):
            click.echo(f'Error. Not authorized user.')
        elif(p.status_code == 402):
            click.echo(f'Error. You are out of quota.')
        elif(p.status_code == 403):
            click.echo(f'Error. There is no such data.')
        elif(p.status_code == 404):
            click.echo(f'Error. Bad request.')
        else:
            click.echo(f'{g.content}')    

def main():
    energy_group56()

if __name__ == '__main__':
    main()
