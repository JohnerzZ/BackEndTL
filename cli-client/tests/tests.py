import os


def test_basic_entrypoint():
    exit_status = os.system('energy_group56')
    print("Basic test was OK!")


def test_login():
    exit_status = os.system('energy_group56 login')
    assert exit_status != 0
    print("Login asked for more parameters as expected!")


def test_actualtotal():
    exit_status = os.system('energy_group56 actualtotalload')
    assert exit_status != 0
    print("Actualtotalload energy-show command asked for more parameters as expected!")
    

def test_admin():
    exit_status = os.system('energy_group56 admin')
    assert exit_status != 0
    print("Admin scope asked for more parameters as expected!")


if __name__ == '__main__':
    test_basic_entrypoint()
    print("TEST 1 WAS OK!")
    test_login()
    print("TEST 2 WAS OK!")
    test_actualtotal()
    print("TEST 3 WAS OK!")
    test_admin()
    print("TEST 4 WAS OK!")
    
