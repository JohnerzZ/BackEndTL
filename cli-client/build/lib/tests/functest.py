import os

def test_entrypoint():
    exit_status = os.system('energy_group56')
    assert exit_status == 0
    print("Test no1 was OK!")

if __name__ == '__main__':
    test_entrypoint()
    